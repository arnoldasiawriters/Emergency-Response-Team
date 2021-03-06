﻿<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.requestexecutor.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.taxonomy.js"></script>

    <!-- Add your CSS styles to the following file -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />
    <link rel="stylesheet" href="common/directives/spinner/loading-spinner.css" />
    <link rel="Stylesheet" type="text/css" href="css/App.css" />    

    <!-- Add your JavaScript to the following file -->
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
    <script type="text/javascript" src="https://code.angularjs.org/1.4.12/angular.js"></script>
    <script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular-route.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/lodash@4.17.4/lodash.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery.SPServices/2014.02/jquery.SPServices.min.js"></script>
    <script type="text/javascript" src="common/directives/pagination/dirPagination.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.5.0/ui-bootstrap-tpls.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular-animate.min.js"></script>
    <script type="text/javascript" src="common/directives/ui-bootstrap-dialogs.js"></script>
    <script type="text/javascript" src="common/utilities/sp-ng-module.js"></script>
    <script type="text/javascript" src="common/utilities/utilities.js"></script>
    <script type="text/javascript" src="common/directives/spinner/loading-spinner.js"></script>
    <!--Controllers-->
    <script type="text/javascript" src="app/emergencies/emergencies.js"></script>

    <!--Services-->
    <script type="text/javascript" src="common/services/countrydirectors.js"></script>
    <script type="text/javascript" src="common/services/emergencies.js"></script>

    <script type="text/javascript" src="app/App.js"></script>
</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    <%--Page Title--%>
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <div class="container-fluid">
        <div class="row">
            <div id="body" ng-app="app">
                <div class="row">
                    <div class="col-md-12">
                        <div id="notification-area">
                        </div>
                        <div class="panel panel-warning">
                            <div class="panel-heading pnl-heading">EMERGENCY RESPONSE DETAILS APPLICATION</div>
                            <div class="panel-body" data-ng-view></div>
                            <div class="panel-footer clearfix"><span class="pull-right">© 2020 VSO International, Emergency Response Team</span></div>
                            <sarsha-spinner name="spinner1"></sarsha-spinner>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
