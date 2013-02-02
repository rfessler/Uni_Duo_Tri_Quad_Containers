<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="uniBlock.aspx.cs" Inherits="Uni_Duo_Tri_Quad_Containers.uniBlock" MasterPageFile="project.Master" %>

<asp:Content ID="uniBlock" ContentPlaceHolderID="uniBlock" runat="server">
	<div id="uniBlockContent">
		<div class="pagebody nonav">
			<div id="uniBlockDemoFull" class="groupcontainer uniBlock navnone outline info infoborder infoarrow">
				<div class="caption-container">
					this is where you put the header.
				</div>
				<div class="text">
					Garage door springs, cables and hardware are under extreme tension and could cause serious injury or damage. For this reason, only qualified technicians
					should adjust or replace them.
				</div>
				<!-- end of text -->
			</div>
			<!-- end of uniBlockDemoFull -->
			<div id="uniBlockTextOnlyDemoFull" class="groupcontainer uniBlock navnone xoutline">
				<div class="caption-container">
					this is where you put the header.
				</div>
				<div class="text">
					Garage door springs, cables and hardware are under extreme tension and could cause serious injury or damage. For this reason, only qualified technicians
					should adjust or replace them.
				</div>
				<!-- end of text -->
			</div>
			<!-- end of uniBlockTextOnlyDemo -->
		</div>
		<!-- end of pagebody nonav -->
		<div class="demoseperator">
			FULL CONTAINER ABOVE --- LEFT NAV CONTAINER BELOW
		</div>
		<div class="pagebody">
			<div class="leftnavplaceholder">
				leftnav
			</div>
			<!-- end of leftnavplaceholder -->
			<div id="uniBlockDemo" class="groupcontainer uniBlock navleft outline info infoborder infoarrow">
				<div class="caption-container">
					this is where you put the header.
				</div>
				<div class="text">
					Garage door springs, cables and hardware are under extreme tension and could cause serious injury or damage. For this reason, only qualified technicians
					should adjust or replace them.
				</div>
				<!-- end of text -->
			</div>
			<!-- end of uniBlockDemo -->
			<div id="uniBlockTextOnlyDemo" class="groupcontainer uniBlock navleft outline">
				<div class="caption-container">
					this is where you put the header.
				</div>
				<div class="text">
					Garage door springs, cables and hardware are under extreme tension and could cause serious injury or damage. For this reason, only qualified technicians
					should adjust or replace them.
				</div>
				<!-- end of text -->
			</div>
			<!-- end of uniBlockTextOnlyDemo -->
			<!-- end of pagebody -->
		</div>
		<!-- end of uniBlockContent -->
	</div>
</asp:Content>