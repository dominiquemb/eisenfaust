let accountnames = ['Account A', 'Account B', 'Account C', 'Account D', 'Account E'],
    acctcash = [100, 200, 300, 400, 500],
    invest = [1000, 2000, 3000, 4000, 5000],
    credits = [111, 222, 333, 444, 555],
    ious = [345, 456, 918, 297, 282],
    interest = [115, 215, 315, 425, 551],

    ctx = document.getElementById("myChart"),
    myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: accountnames,
        datasets: [
          {
            data: acctcash,
            label: "Cash",
            backgroundColor: "rgba(20,40,60,.8)",
          },
          {
            data: invest,
            label: "Investments",
            backgroundColor: "rgba(118,0,0,.8)",
          },
          {
            data: credits,
            label: "Credits",
            backgroundColor: "rgba(2,2,2.8)",
          },
          {
            data: ious,
            label: "Owings",
            backgroundColor: "rgba(53,114,102,.8)"
          },
          {
            data: interest,
            label: "Interests",
            backgroundColor: "rgba(163,187,173,.8)",
          }
        ]
      },
      options: {
        scales: {
          xAxes: [{stacked: true}],
          yAxes: [{stacked: true}]
        },
/*
        tooltips: {
            enabled: true,
            mode: 'single',
            callbacks: {
                label: function(tooltipItems, data) {
                    return true;
//                    return 'test';
                }
            }
        }
*/
      }
    });

// Select init
let chartLabels = document.getElementById('chartLabels');
myChart.data.datasets.forEach(function(el, i){
  let option = document.createElement('option');
  option.value = i;
  option.text = el.label;
  chartLabels.appendChild(option);
});

// Drag & Drop
function allowDrop(e) {
  e.preventDefault();
}

let dragdrop_elem = null;

function drag(e) {
  dragdrop_elem = myChart.getElementAtEvent(e)[0];
  closeTip(myChart, dragdrop_elem._datasetIndex, dragdrop_elem._index);
  $('#dragndroptooltip').addClass('active').html(myChart.data.datasets[dragdrop_elem._datasetIndex].data[dragdrop_elem._index] + ' from ' + dragdrop_elem._model.label);
  // alert(dragdrop_elem);
}

function drop(e) {
  e.preventDefault();
  let dropPoint = myChart.getElementAtEvent(e)[0];
  if (dropPoint){
    $('#dragndroptooltip').removeClass('active');
    $('#dragndropconfirm').dialog(
       {
          resizable: false,
          height: "auto",
          modal: true,
          buttons: {
            "Yes": function() {
              $( this ).dialog( "close" );
                let value = myChart.data.datasets[dragdrop_elem._datasetIndex].data[dragdrop_elem._index];
                myChart.data.datasets[dragdrop_elem._datasetIndex].data[dropPoint._index] += value;
                myChart.data.datasets[dragdrop_elem._datasetIndex].data[dragdrop_elem._index] -= value;
                myChart.update();
/*
                setTimeout(function() {
                    openTip(myChart, dragdrop_elem._datasetIndex, dragdrop_elem._index);
                }, 300);
*/
            },
            "No": function() {
              $( this ).dialog( "close" );
              $('#dragndrophowmuch').dialog({
                resizable: false,
                height: "auto",
                modal: true,
                buttons: {
                    "Submit": function() {
                        let value = parseFloat($('#dragndrophowmuch_value').val());
                        $(this).dialog("close");
                        myChart.data.datasets[dragdrop_elem._datasetIndex].data[dropPoint._index] += value;
                        myChart.data.datasets[dragdrop_elem._datasetIndex].data[dragdrop_elem._index] -= value;
                        myChart.update();
                        $('#dragndroptooltip').removeClass('active');
/*
                        setTimeout(function() {
                            openTip(myChart, dragdrop_elem._datasetIndex, dragdrop_elem._index);
                        }, 300);
*/
                    },
                    "Cancel": function() {
                        $(this).dialog('close');
                    }
                }
              })
            }
          }
       }
      );
  }
}

ctx.draggable = true;

ctx.ondragstart = function(e){
  drag(e);

};

ctx.ondrop = function(e){
  drop(e);
};

ctx.ondragover = function(e) {
  allowDrop(e);
};

// Context Menu
let menu = document.getElementById('context-menu');
let target_elem = null;

ctx.onclick = function(evt){
  menu.style.display = 'none';
};

ctx.oncontextmenu = function(e){
  e.preventDefault();
  let rect = ctx.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top;

  menu.style.left = x + 1 + 'px';
  menu.style.top = y + 1 + 'px';
  target_elem = myChart.getElementAtEvent(e)[0];

  if (target_elem) {
    chartLabels.options[target_elem._datasetIndex].selected = 'selected';
    menu.style.display = 'block';
  }
};

// Delete Element
let deleteElem = document.getElementById('deleteElem');

deleteElem.onclick = function(e){
  e.preventDefault();
  if (target_elem) {
    let value = myChart.data.datasets[target_elem._datasetIndex].data[target_elem._index];

    myChart.data.datasets[target_elem._datasetIndex].data[target_elem._index] -= value;
    myChart.update();
  }
  menu.style.display = 'none';
};

// Add New Data
let submit_btn = document.getElementById('onSubmit');

submit_btn.onclick = function(e){
  let selected_label = document.getElementById('chartLabels'),
      value_input = document.getElementById('chartValue');

  if (selected_label && target_elem && value_input.value !== '') {
    myChart.data.datasets[selected_label.value].data[target_elem._index] += parseInt(value_input.value);
    myChart.update();
  } else {
    e.preventDefault();
  }

  selected_label.value = '';
  value_input.value = '';
  menu.style.display = 'none';
};

document.addEventListener("dragstart", function( event ) {
    var img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
    img.style.border = '0px';
    event.dataTransfer.setDragImage(img, 0, 0);
}, false);

document.addEventListener('dragover', function(evt) {
    $('#dragndroptooltip').css('left', evt.pageX + 'px');
    $('#dragndroptooltip').css('top', evt.pageY + 'px');
}, false);


function openTip(oChart,datasetIndex,pointIndex){
   if(oChart.tooltip._active == undefined)
      oChart.tooltip._active = []
   var activeElements = oChart.tooltip._active;
   var requestedElem = oChart.getDatasetMeta(datasetIndex).data[pointIndex];
   for(var i = 0; i < activeElements.length; i++) {
       if(requestedElem._index == activeElements[i]._index)  
          return;
   }
   activeElements.push(requestedElem);
   oChart.tooltip._active = activeElements;
   oChart.tooltip.update(true);
   oChart.draw();
}

function closeTip(oChart,datasetIndex,pointIndex){
   var activeElements = oChart.tooltip._active;
   if(activeElements == undefined || activeElements.length == 0)
     return;
   var requestedElem = oChart.getDatasetMeta(datasetIndex).data[pointIndex];
   for(var i = 0; i < activeElements.length; i++) {
       if(requestedElem._index == activeElements[i]._index)  {
          activeElements.splice(i, 1);
          break;
       }
   }
   oChart.tooltip._active = activeElements;
   oChart.tooltip.update(true);
   oChart.draw();
}

window.openTip = openTip;
window.closeTop = closeTip;
