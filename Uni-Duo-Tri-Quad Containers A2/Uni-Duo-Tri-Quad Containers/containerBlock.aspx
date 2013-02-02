<%@ Page Title="" Language="C#" MasterPageFile="~/project.Master" AutoEventWireup="true" CodeBehind="containerBlock.aspx.cs" Inherits="Uni_Duo_Tri_Quad_Containers.container" %>

<asp:Content ID="containerBlock" ContentPlaceHolderID="containerBlock" runat="server">
	<div id="containerContent">
		<div class="caption-pagetitle">
			'Container Block' demo.</div>
		<div class="pagebody nonav">
			<div id="containerDemoFull" class="groupcontainer navnone outline xinfo xinfoborder xinfoarrow">
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
			<div id="containerDemo" class="groupcontainer navleft outline info infoBorder infoarrow">
				<div class="caption-container">
					this is where you put the header.
				</div>
				<div class="text">
					Garage door springs, cables and hardware are under extreme tension and could cause serious injury or damage. For this reason, only qualified technicians
					should adjust or replace them.
				</div>
				<!-- end of text -->
			</div>
			<!-- end of containerDemo -->
		</div>
		<!-- end of pagebody -->
	</div>
	<!-- end of containerContent -->
</asp:Content>