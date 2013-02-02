using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using SeasCleanDataAccess;

namespace SearsGarageWeb.service
{
	/// <summary>
	/// Summary description for AjaxHelper
	/// </summary>
	[WebService(Namespace = "http://tempuri.org/")]
	[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
	[System.ComponentModel.ToolboxItem(false)]

	// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line.
	[System.Web.Script.Services.ScriptService]
	public class AjaxHelper : System.Web.Services.WebService
	{
		public UserSession SCAUserSession
		{
			get
			{
				if (Session["USER_SESSION"] == null)
				{
					Session["USER_SESSION"] = new UserSession();
				}
				return (UserSession)Session["USER_SESSION"];
			}
		}

		/// <summary>
		/// Fetches the special offers.
		/// </summary>
		/// <param name="OwnerID">The owner ID.</param>
		/// <param name="ServiceTypeID">The service type ID.</param>
		/// <param name="TerritoryID">The territory ID.</param>
		/// <returns></returns>
		/// <remarks>rfessler:12/13/2012</remarks>
		[WebMethod(EnableSession = true, Description = "Returns the Special Offers for the Territory")]
		public Array FetchSpecialOffers(Guid OwnerID, Guid ServiceTypeID, Guid TerritoryID)
		{
			Array offers = DataHelper.FetchSpecialOffers_V2(OwnerID, ServiceTypeID, TerritoryID, 3);
			return offers;
		}

        [WebMethod(EnableSession = true, Description = "Returns the Special Offers for the Territory")]
        public int SaveCustomerInfo(string fname, string lname, string add1, string add2, string city, string state, string zip, string hphone, string hext, string cphone, string cext, string email, string confemail, string comments)
        {
            bool csave = true;
            bool osave = true;

            DateTime dt = new DateTime();
            dt = DateTime.Now;

            Customer newcustomer = new Customer();
            Address newaddress = new Address();
            Address newbilladdress = new Address();
            ZipCode z = new ZipCode();

            newbilladdress = null;
            z = DataHelper.FetchZipCode(zip, city, state);

            if (z != null)
            {
                SCAUserSession.SelectedZipCode = z.ZipCode;
                SCAUserSession.SelectedZipCodeID = z.ZipCodeID;

                FranchiseTerritory ft = new FranchiseTerritory();
                ft = DataHelper.FetchFranchiseTerritoryByZipCodeIDProductRefID(z.ZipCodeID, SCUCConstants.ProductRefGarage);

                Owner ow = new Owner();
                ow = DataHelper.GetOwnerByFranchise(new Guid(ft.FranchiseID.ToString()));

                SCAUserSession.SelectedOwnerID = ow.OwnerID;
                SCAUserSession.SelectedTerritoryID = new Guid(ft.TerritoryID.ToString());

                Territory t = new Territory();
                t = DataHelper.FetchTerritory(new Guid(SCAUserSession.SelectedTerritoryID.ToString()));

                SCAUserSession.SelectedOfficeID = new Guid(t.SchedulingOfficeID.ToString());
            }

            csave = DataHelper.SaveCustomer_V2(SCAUserSession.SelectedBusinessRefID, SCAUserSession.SelectedOwnerID, SCAUserSession.SelectedOfficeID, SCAUserSession.SelectedTerritoryID,
                                   LoadCustomerInformation(fname, lname, email), LoadAddressInfo(add1, add2, city, state, zip), null, LoadPhoneInfo(hphone, hext, cphone, cext), string.Empty, 
                                   ref newcustomer, ref newaddress, ref newbilladdress, SCAUserSession.SelectedUserName);

            if (csave)
            {
                SCAUserSession.SetNewCustomer(ref newcustomer, newaddress);

                SCAUserSession.SelectedCustomerID = newcustomer.CustomerID;
                SCAUserSession.SelectedCustomer = newcustomer;

                SeasCleanDataAccess.ServiceClasses.Order o = new SeasCleanDataAccess.ServiceClasses.Order();
                Order euc = new Order();

                SiteRef s = new SiteRef();
                s = DataHelper.FetchSiteRef(new Guid(SCAUserSession.SelectedSiteID.ToString()));
                s.BusinessRefID = SCAUserSession.SelectedBusinessRefID;

                MarketingSource m = new MarketingSource();
                m = DataHelper.SearchMarketingSource(s.Description, new Guid(SCAUserSession.SelectedTerritoryID.ToString()), false);
                List<MarketingSourceDetailFieldData> msdfds = new List<MarketingSourceDetailFieldData>();

                foreach (MarketingSourceDetailFieldData msdf in msdfds)
                {
                    string str = string.Empty;
                }

                SeasCleanDataAccess.ServiceClasses.ScheduleEntry oase = new SeasCleanDataAccess.ServiceClasses.ScheduleEntry();
                oase.ScheduleDate = dt;

                SeasCleanDataAccess.ServiceClasses.TimeSlot ts = new SeasCleanDataAccess.ServiceClasses.TimeSlot();
                ts.Type = "UNA";
                oase.TimeSlots.Insert(0, ts);

                FranchiseTerritory ft = new FranchiseTerritory();
                ft = DataHelper.FetchFranchiseTerritoryByTerritory(new Guid(SCAUserSession.SelectedTerritoryID.ToString()));

                ItemUnitTypeMaterialTypeSizeType iutmtst = new ItemUnitTypeMaterialTypeSizeType();
                iutmtst = DataHelper.FetchItemUnitTypeMaterialTypeSizeType(new Guid(SCUCConstants.GarageDefaultIUTMTST.ToString()));

                SeasCleanDataAccess.ServiceClasses.OrderItem oi = new SeasCleanDataAccess.ServiceClasses.OrderItem();
                oi.Type = SCUCConstants.GarageDefaultIUTMTST.ToString();
                o.OrderItems.Add(oi);

                o.Notes = comments;

                osave = DataHelper.SaveOrder_V2(ref o, oase, ref newcustomer, ref newaddress, ref newbilladdress, ref euc, SCUCConstants.ProductRefGarage,
                                                m.MarketingSourceID, msdfds, ft, s, HttpContext.Current.Request.UserHostAddress, SCAUserSession.SelectedUserName, Guid.Empty);

                if (osave) 
                {
                    SCAUserSession.SelectedOrderID = euc.OrderID;
                    SCAUserSession.SelectedOrderNumber = euc.OrderNumber;

                    return int.Parse("3" + euc.OrderNumber.ToString());
                }
                else { return 1; }
            }
            else { return 2; }
        }

        private SeasCleanDataAccess.ServiceClasses.Customer LoadCustomerInformation(string firstname, string lastname, string email)
        {

            SeasCleanDataAccess.ServiceClasses.Customer csvc = new SeasCleanDataAccess.ServiceClasses.Customer();
            csvc.FirstName = firstname.ToString();
            csvc.LastName = lastname.ToString();
            csvc.EmailAddress = email.ToString();

            CustomerTypeRef ct = new CustomerTypeRef();
            ct = DataHelper.FetchCustomerTypeByTypeID(SCUCConstants.CustomerTypeResidential);
            csvc.Type = ct.Description;

            return csvc;
        }

        private SeasCleanDataAccess.ServiceClasses.Address LoadAddressInfo(string address1, string address2, string city, string state, string zipnumber)
        {
            SeasCleanDataAccess.ServiceClasses.Address asvc = new SeasCleanDataAccess.ServiceClasses.Address();
            asvc.AddressLine1 = address1.ToString();
            asvc.AddressLine2 = address2.ToString();
            asvc.City = city.ToString();
            asvc.State = state.ToString();
            asvc.ZipCode = zipnumber.ToString();
            asvc.Type = SCUCConstants.AddressTypeResidentialService.ToString();

            return asvc;
        }

        private List<SeasCleanDataAccess.ServiceClasses.PhoneNumber> LoadPhoneInfo(string homephone, string homeextnumber, string cellphone, string cellextnumber)
        {
            List<SeasCleanDataAccess.ServiceClasses.PhoneNumber> plsvc = new List<SeasCleanDataAccess.ServiceClasses.PhoneNumber>();
            SeasCleanDataAccess.ServiceClasses.PhoneNumber phone = new SeasCleanDataAccess.ServiceClasses.PhoneNumber();

            phone.PhoneNumber = homephone.ToString();
            phone.Extension = homeextnumber.ToString();
            phone.Primary = true;

            PhoneNumberTypeRef pt = new PhoneNumberTypeRef();
            pt = DataHelper.FetchPhoneNumberTypeByTypeID(SCUCConstants.PhoneTypeHome);
            phone.Type = pt.Description;

            plsvc.Add(phone);

            if (cellphone != null && cellphone.ToString() != string.Empty)
            {
                phone.PhoneNumber = cellphone.ToString();
                phone.Extension = cellextnumber.ToString();
                phone.Primary = false;

                pt = DataHelper.FetchPhoneNumberTypeByTypeID(SCUCConstants.PhoneTypeMobile);
                phone.Type = pt.Description;

                plsvc.Add(phone);
            }
            return plsvc;
        }
	}
}