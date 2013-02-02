using System;
using System.Web;
using SeasCleanDataAccess;

namespace SearsGarageWeb.services
{
	/// <summary>
	/// Summary description for ContentHandler: Returns binary ContentObject.ContentData with proper HTML ContentType header
	/// </summary>
	public class ContentHandler : IHttpHandler
	{
		public void ProcessRequest(HttpContext context)
		{
			Guid co_id = new Guid(context.Request.QueryString["id"]);

			ContentObject co = DataHelper.GetContentObject(co_id);

			switch (co.Extension)
			{
				case "bmp": context.Response.ContentType = "image/bmp"; break;
				case "gif": context.Response.ContentType = "image/gif"; break;
				case "jpeg": context.Response.ContentType = "image/jpeg"; break;
				case "jpg": context.Response.ContentType = "image/jpeg"; break;
				case "png": context.Response.ContentType = "image/png"; break;
				case "tif": context.Response.ContentType = "image/tiff"; break;
				case "tiff": context.Response.ContentType = "image/tiff"; break;
			}

			context.Response.BinaryWrite(co.ContentData.ToArray());

			// http://stackoverflow.com/questions/691212/how-do-i-determine-a-files-content-type-in-net // gives a translation table
		}

		public bool IsReusable
		{
			get
			{
				return false;
			}
		}
	}
}