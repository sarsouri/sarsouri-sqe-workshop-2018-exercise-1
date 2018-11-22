import $ from 'jquery';
import {parseCode} from './code-analyzer';
import {parsethecode} from './parser';

$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);
        $('#parsedCode').val(JSON.stringify(parsedCode, null, 2));
        //var ss='';
        var arrnew=parsethecode(parsedCode,codeToParse);
        var ss =[{"line":1,"value":"x"},{"line":2,"value":"y"}];
        var s=tostring(arrnew);

        $('#parsedCode1').val(s);

        createTable(arrnew);

    });
});

function tostring(arrnew) {
    var s='';
   // console.log('dd');
    for (let i=0;i<arrnew.length;i++){
        //console.log('dd');
        if (i==0){
            s=s+'[';
        }
        s=s+'{line:'+arrnew[i].get('line')+',';
        s=s+'type:'+arrnew[i].get('type')+',';
        s=s+'name:'+arrnew[i].get('name')+',';
        s=s+'condition:'+arrnew[i].get('condition')+',';
        s=s+'value:'+arrnew[i].get('value')+'}';
        if (i!=arrnew.length-1){
            s=s+',';
        }
        if (i==arrnew.length-1){
            s=s+']';
        }
    }
    return s;
}



function createTable(tableData) {
    var table = document.createElement('table');
    var tableBody = document.createElement('tbody');

    tableData.forEach(function(rowData) {
        var row = document.createElement('tr');

        rowData.forEach(function(cellData) {
            var cell = document.createElement('td');
            cell.appendChild(document.createTextNode(cellData));
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    document.body.appendChild(table);
}
