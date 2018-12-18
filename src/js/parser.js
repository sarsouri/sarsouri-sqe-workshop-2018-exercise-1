export{parsethecode};
var arr=[];
function parsethecode(parsedCode,codeToParse) {
    arr=[];
    var mymap= new Map();
    mymap.set('line','');
    mymap.set('line','Line');
    mymap.set('type','Type');
    mymap.set('name','Name');
    mymap.set('condition','Condition');
    mymap.set('value','Value');
    arr.push(mymap);
    f(parsedCode);
    findtheline(codeToParse);
    return arr;
}
function findtheline(c) {
    var xx= c.split("\n");
    let j=0;
    let i=1;
    while (i<arr.length) {
        //console.log(i);
        if (arr[i].get('name')!=''){
            //console.log(arr[i].get('name'));

            if (xx[j].indexOf(arr[i].get('name'))!=-1) {
                arr[i].set('line',j+1);
                //  console.log(xx[j]);
                xx[j]= xx[j].replace(arr[i].get('name'),'');
                //  console.log(xx[j]);
                i++;
                continue;
            }else {
                j++;
                continue
            }
        }else{
            // console.log(statment(xx[j],arr[i].get('type')));
            let st=statment(xx[j],arr[i].get('type'));
            if (st!="notfound"){
                arr[i].set('line',j+1);
                //   console.log(xx[j]);
                //  console.log(st);
                xx[j]= xx[j].replace(st,'');
                //  console.log(xx[j]);
                i++;
                continue;
            } else {
                j++;
                continue;
            }
        }
    }
}
function f(x) {
    //$('#parsedCode1').val(x.type)
    if (x.type == 'Program') {
        //console.log(1);
        for (let i = 0; i < x.body.length; i++) {
            f(x.body[i]);

        }
    }
    if (x.type == 'FunctionDeclaration') {functiondeclaration(x);}
    if (x.type == 'VariableDeclaration') {variabledeclaration(x);}
    if (x.type == 'ExpressionStatement') {expressionstatement(x);}
    if (x.type == 'WhileStatement') {whilestatement(x);}
    if (x.type == 'IfStatement') {ifstatement(x);}
    if (x.type == 'ReturnStatement') {returnstatment(x);}
    if (x.type=='ForStatement') {forstatement(x);}



}


function functiondeclaration(x) {
   // console.log(2);
    var mymap= new Map();
    mymap.set('line','');
    mymap.set('type','Function Declaration');
    mymap.set('name',x.id.name);
    mymap.set('condition','');
    mymap.set('value','');
    arr.push(mymap);
    for (let i=0;i<x.params.length;i++) {
       // console.log(3);
        mymap= new Map();
        mymap.set('line','');
        mymap.set('type','variable Declaration');
        mymap.set('name',x.params[i].name);
        mymap.set('condition','');
        mymap.set('value','');
        arr.push(mymap);
    }
    for(let i=0;i<x.body.body.length;i++){
        f(x.body.body[i]);
    }

}

function variabledeclaration(x) {
   // console.log(4);
    var mymap = new Map();
    //$('#parsedCode1').val(arr.length);
    for (let i=0;i<x.declarations.length;i++){
      //  console.log(5);
        mymap= new Map();
        mymap.set('line','');
        mymap.set('type','variable Declaration');
        mymap.set('name',x.declarations[i].id.name);
        mymap.set('condition','');
        if (x.declarations[i].init==null) {
        //    console.log(6);
            mymap.set('value', '');
        }else {
        //    console.log(7);
            mymap.set('value',x.declarations[i].init.value );
        }
        arr.push(mymap);

    }
}

function expressionstatement(x) {
   // console.log(8);
    if (x.expression.type=='AssignmentExpression') {
       // console.log(9);
        var mymap = new Map();
        mymap.set('line','');
        mymap.set('type', 'assignment expression');
        mymap.set('name', x.expression.left.name);
        mymap.set('condition', '');

        mymap.set('value', exp(x.expression.right));
        arr.push(mymap);
    }else {
      //  console.log(10);
        var mymap = new Map();
        mymap.set('line','');
        mymap.set('type', 'update expression');
        mymap.set('name', x.expression.argument.name);
        mymap.set('condition', '');

        mymap.set('value', x.expression.argument.name+x.expression.operator);
        arr.push(mymap);
    }
}

function whilestatement(x) {
   // console.log(11);
    var mymap = new Map();
    mymap.set('line','');
    mymap.set('type', 'while statement');
    mymap.set('name', '');
    mymap.set('condition', exp(x.test));

    mymap.set('value', '');
    arr.push(mymap);
    for(let i=0;i<x.body.body.length;i++){
        f(x.body.body[i]);
    }
}

function ifstatement(x) {
    //console.log(12);
    var mymap = new Map();
    mymap.set('line','');
    mymap.set('type', 'if statement');
    mymap.set('name', '');
    mymap.set('condition', exp(x.test));
    mymap.set('value', '');
    arr.push(mymap);
   // console.log(x.consequent.lenght);
    if (x.consequent.type=='BlockStatement') {
     //   console.log(13);
        for (let i = 0; i < x.consequent.body.length; i++) {
            f(x.consequent.body[i]);
        }
    }else {//console.log(14);
        f(x.consequent);}
    if (x.alternate!=null) {
        //console.log(15);
        if (x.alternate.type=='IfStatement') {
         //   console.log(16);
            elseifstatement(x.alternate);
        }else {
          //  console.log(17);
            f(x.alternate);
        }
    }
}
function elseifstatement(x) {
    var mymap = new Map();
    mymap.set('line','');
    mymap.set('type', 'else if statement');
    mymap.set('name', '');
    mymap.set('condition', exp(x.test));
    mymap.set('value', '');
    arr.push(mymap);
    if (x.consequent.type=='BlockStatement') {
      //  console.log(17.5);
       // console.log(x.consequent.body.length);
        for (let i = 0; i < x.consequent.body.length; i++) {
            console.log(17.6);
            f(x.consequent.body[i]);
        }
    }else {f(x.consequent);}
    if (x.alternate!=null) {
        if (x.alternate.type=='IfStatement') {
         //   console.log(17.7);
            elseifstatement(x.alternate);
        }else {
            f(x.alternate);
        }
    }
}
function returnstatment(x) {
    //console.log(18);
    var mymap = new Map();
    mymap.set('line','');
    mymap.set('type', 'return statement');
    mymap.set('name', '');
    mymap.set('condition', '');
    mymap.set('value', exp(x.argument));
    arr.push(mymap);
}
function  forstatement(x) {
    //console.log(19);
    f(x.init);
    //console.log("nasrat");
    var mymap = new Map();
    mymap.set('line','');
    mymap.set('type', 'for statement');
    // console.log(mymap.get('type'));
    mymap.set('name', '');
    mymap.set('condition', exp(x.test));
    mymap.set('value', '');
    arr.push(mymap);
    var mymap1 = new Map();
    mymap1.set('line','');
    mymap1.set('type', 'update expression');
    mymap1.set('name', x.update.argument.name);
    mymap1.set('condition', '');
    mymap1.set('value', x.update.argument.name+x.update.operator);
    arr.push(mymap1);
    for (let i=0;i<x.body.body.length;i++){
        f(x.body.body[i]);
    }
}
function exp(x) {
    var s='';
    if (x.type=='UnaryExpression') {
      //  console.log(20);

        s=x.operator+type(x.argument);
        return s;
    }
    if (x.type=='BinaryExpression') {
        //console.log(21);
        s= exp(x.left)+x.operator+exp(x.right);
    }else {
        if (x.type=='MemberExpression') {
        //    console.log(22);
            s=x.object.name;
            if (x.property.type == 'Identifier') {
           //    console.log(23);
                s = s+'['+x.property.name+']';
            } else {
             //   console.log(24);
                s = s+'['+x.property.value+']';
            }
        }else {
           // console.log(25);
            return type(x);
        }
    }
    return s;
}
function type(x) {
    var s='';
    if (x.type == 'Identifier') {
        s = x.name;
    } else {
        s = x.value;
    }
    return s;
}
function statment(line,word) {
    if (word=='if statement') {
        if (line.indexOf("if")!=-1) {
            return "if";
        }
    }
    if (word=='else if statement') {
        if (line.indexOf("else")!=-1&&line.indexOf("if")!=-1) {
            return "else";
        }
    }

    if (word=='return statement') {
        if (line.indexOf("return")!=-1) {
            return "return";
        }
    }
    if (word=='while statement') {
        if (line.indexOf("while")!=-1) {
            return "while";
        }
    }
    if (word=='for statement') {
        if (line.indexOf("for")!=-1) {
            return "for";
        }
    }
    return "notfound";
}