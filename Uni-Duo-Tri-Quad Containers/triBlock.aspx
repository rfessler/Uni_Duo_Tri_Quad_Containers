<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="triBlock.aspx.cs" Inherits="Uni_Duo_Tri_Quad_Containers._Default" MasterPageFile="project.Master" %>

<asp:Content ID="triBlock" ContentPlaceHolderID="triBlock" runat="server">
	<div id="triBlockContent" class="maincontent">
		<div class="pagebody nonav">
			<div id="TriBlockDemoFull" class="groupcontainer triBlock navnone">
				<div class="caption-container hide ">
				</div>
				<div class="subcontainer articles border first">
					<div class="article">
						<div class="image">
							<img class="seperator" src="images/placeholder_274.jpg" alt="" />
						</div>
						<div class="caption-article">
							Garage Door Tune Up & Maintenance
						</div>
					</div>
					<div class="text">
						Your garage door is essentially a moving wall that requires annual maintenance just like your car or truck.
					</div>
					<input id="Button1" class="link" type="button" name="tuneupAndMaint" value="Learn More" />
				</div>
				<!-- end of articles -->
				<div class="subcontainer articles border">
					<div class="article">
						<div class="image">
							<img class="seperator" src="images/placeholder_274.jpg" alt="" />
						</div>
						<div class="caption-article">
							Broken Springs
						</div>
					</div>
					<div class="text">
						Broken springs is a common issue with garage doors. Our garage door repair specialist can help you replace broken springs to get your garage door back
						up and running.
					</div>
					<input id="Button2" class="link" type="button" name="brokenSprings" value="Learn More" />
				</div>
				<!-- end of articles -->
				<div class="subcontainer articles border last">
					<div class="article">
						<div class="image">
							<img class="seperator" src="images/placeholder_274.jpg" alt="" />
						</div>
						<div class="caption-article">
							Garage Door Off Track
						</div>
					</div>
					<div class="text">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas malesuada vehicula eros, a mollis lectus feugiat at. Sed viverra sollicitudin.
					</div>
					<input id="Button3" class="link" type="button" name="doorOffTrack" value="Learn More" />
				</div>
				<!-- end of point -->
			</div>
			<!-- end of TriBlockDemoFull -->
		</div>
		<!-- end of pagebody nonav -->
		<div class="demoseperator">
			========================= FULL CONTAINER ABOVE --- LEFT NAV CONTAINER BELOW =========================
		</div>
		<div class="pagebody">
			<div class="leftnavplaceholder">
				leftnav
			</div>
			<!-- end of leftnavplaceholder -->
			<div id="TriBlockDemo" class="groupcontainer triBlock navleft _border">
				<div class="caption-container hide">
				</div>
				<div class="subcontainer articles border first">
					<div class="article">
						<div class="image">
							<img class="seperator" src="images/placeholder_200.jpg" />
							<%--<img class="seperator" src="images/GarageDoorOpeners/4PositionGDO53990_220.jpg" />--%>
						</div>
						<div class="caption-article">
							Garage Door Tune Up & Maintenance
						</div>
					</div>
					<div class="text">
						Your garage door is essentially a moving wall that requires annual maintenance just like your car or truck.
					</div>
					<input id="article1Link" class="link" type="button" name="tuneupAndMaint" value="Learn More" />
				</div>
				<!-- end of articles -->
				<div class="subcontainer articles border">
					<div class="article">
						<div class="image">
							<img class="seperator" src="images/placeholder_200.jpg" />
							<%--<img class="seperator" src="images/GarageDoorOpeners/BroknSprg_220.jpg" />--%>
						</div>
						<div class="caption-article">
							Broken Springs
						</div>
					</div>
					<div class="text">
						Broken springs is a common issue with garage doors. Our garage door repair specialist can help you replace broken springs to get your garage door back
						up and running.
					</div>
					<input id="article2Link" class="link" type="button" name="brokenSprings" value="Learn More" />
				</div>
				<!-- end of articles -->
				<div class="subcontainer articles border last">
					<div class="article">
						<div class="image">
							<img class="seperator" src="images/placeholder_200.jpg" />
							<%--<img class="seperator" src="images/GarageDoorOpeners/GDO_TuneUp_220.jpg" />--%>
						</div>
						<div class="caption-article">
							Garage Door Off Track
						</div>
					</div>
					<div class="text">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas malesuada vehicula eros, a mollis lectus feugiat at. Sed viverra sollicitudin.
					</div>
					<input id="article3Link" class="link" type="button" name="doorOffTrack" value="Learn More" />
				</div>
				<!-- end of point -->
			</div>
			<!-- end of TriBlockDemo -->
		</div>
		<!-- end of pagebody -->
	</div>
	<!-- end of maincontent -->
</asp:Content>