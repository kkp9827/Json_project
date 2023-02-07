/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var jpdbBaseURL = 'http://api.login2explore.com:5577';
var jpdbIRL = '/api/irl';
var jpdbIML = '/api/iml';
var empDBName = 'EMP-DB';
var empRelationName = 'EmpData';
var connToken = '90938346|-31949271953603285|90951946';

function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno" , lvData.rec_no);
}
function getEmpIdAsJsonObj(){
    var empId = $('#empId').val();
    var jsonStr ={
        Id: empId
    };
    return JSON.stringify(jsonStr);
} 

function validateAndGetFormData() {
    var empId, empName, empclass, empbirth, empaddress, empEnroll;
    empId = $("#empId").val();
    empName = $("#empName").val();
    empbirth = $("#empbirth").val();
    empaddress = $("#empaddress").val();
    empEnroll = $("#empEnroll").val();
    if (empId === "") {
        alert("student ID Required Value");
        $("#empId").focus();
        return "";
    }
    if (empName === "") {
        alert("student Name is Required Value");
        $("#empName").focus();
        return "";
    }
    if (empclass === "") {
        alert("student class is Required Value");
        $("#empclass").focus();
        return "";
    }
    if (empbirth === "") {
        alert("student birthdate is Required Value");
        $("#empbirth").focus();
        return "";
    }
    if (empaddress === "") {
        alert("student address is Required Value");
        $("#empaddress").focus();
        return "";
    }
    if (empEnroll === "") {
        alert("student enrollment date is Required Value");
        $("#empEnroll").focus();
        return "";

    }
    var jsonStrObj = {
        Id: empId,
        Name: empName,
        Class: empclass,
        birth: empbirth,
        address: empaddress,
        Enroll: empEnroll
    };
    return JSON.stringify(jsonStrObj);
}
function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#empName").val(record.Name);
    $("#empclass").val(record.Class);
    $("#empbirth").val(record.birth);
    $("#empaddress").val(record.address);
    $("#empEnroll").val(record.Enroll);
 
}
function resetForm() {
    $("#empId").val("")
    $("#empName").val("");
    $("#empclass").val("");
    $("#empbirth").val("");
    $("#empaddress").val("");
    $("#empEnroll").val("");
    $("#empID").prop('disabled', false);
    $("#save").prop('disabled', true);
    $("#change").prop('disabled', true);
    $("#reset").prop('disabled', true);
    $("#empId").focus();
}
function getEmp(){ 
     var empIdJsonObj = getEmpIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, empDBName, empRelationName, empIdJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});
     if (resJsonObj.status === 400){
         $("#save").prop('disabled', false);
         $("#reset").prop('disabled', false);
         $("#empName").focus();
     }
     else if(resJsonObj.status === 200){
         $("#empId").prop('disabled', true);
         fillData(resJsonObj);
         $("#change").prop('disabled', false);
         $("#reset").prop('disabled', false);
         $("#empName").focus();
     }  
}
function saveData() {
    var jsonStrObj = validateAndGetFormData();
    if (jsonStrObj === "") {
        return "";
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, empDBName, empRelationName);

    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#empId").focus();
}

function changeData() {
    $('#change').prop("disabled", true);
    jsonchg = validateAndGetFormData();
    
    var updateRequest = createUPDATERecordRequest(connToken, jsonchg, empDBName, empRelationName, localstorage.getItem('recno'));

    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $("#empId").focus();
}

