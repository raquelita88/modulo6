
var obj = prompt("referencia u objeto: ");

renderTemplate(obj);

function inspeccionar(obj)
{
  var msg = new Array();

  for (var property in obj)
  {
    if (typeof obj[property] == 'function')
    {
      var inicio = obj[property].toString().indexOf('function');
      var fin = obj[property].toString().indexOf(')')+1;
      var propertyValue=obj[property].toString().substring(inicio,fin);
      msg[msg.length] = {'type' : (typeof obj[property]), 'name' : property, 'value' : propertyValue};
    }
    else if (typeof obj[property] == 'unknown')
    {
      msg[msg.length] = {'type' : 'unknown', 'name' : property, value : 'unknown'};
    }
    else
    {
      msg[msg.length] ={'type' : (typeof obj[property]), 'name' : property, 'value' : obj[property]};
    }
  }
  return msg;
};

function activateTemplate(id) {
	var t = document.querySelector(id);
	return document.importNode(t.content, true);
};

function renderTemplate(obj){
	var tbody = document.querySelector(".property__body");
	var propertys = inspeccionar(eval(obj));

	for (var i = 0; i < propertys.length; i++) {
		var clone = activateTemplate("#template--property");
		clone.querySelector("[data-property]").innerHTML = propertys[i].name;
		clone.querySelector("[data-type]").innerHTML = propertys[i].type;
		clone.querySelector("[data-value]").innerHTML = propertys[i].value;
		tbody.appendChild(clone);
	};
};