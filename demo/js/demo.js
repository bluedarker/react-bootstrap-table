import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

var products = [];

function addProducts(quantity) {
  var startId = products.length;
  for (var i = 0; i < quantity; i++) {
    var id = startId + i;
    products.push({
      id: id,
      name: "Item name " + id,
      price: 100 + i
    });
  }
}

addProducts(70);

function onRowSelect(row, isSelected){
  console.log(row);
  console.log("selected: " + isSelected)
}

function onSelectAll(isSelected){
  console.log("is select all: " + isSelected);
}

function onAfterSaveCell(row, cellName, cellValue){
  console.log("Save cell '"+cellName+"' with value '"+cellValue+"'");
  console.log("Thw whole row :");
  console.log(row);
}

function onAfterTableComplete(){
  console.log('Table render complete.');
}

function onAfterDeleteRow(rowKeys){
  console.log("onAfterDeleteRow");
  console.log(rowKeys);
}

function onAfterInsertRow(row){
  console.log("onAfterInsertRow");
  console.log(row);
}

var selectRowProp = {
  mode: "checkbox",
  clickToSelect: true,
  // hideSelectColumn: true, //you can hide select column, if you enable clickToSelect
  selected: [], //default selection on table
  bgColor: "rgb(238, 193, 213)",
  onSelect: onRowSelect,
  onSelectAll: onSelectAll
};

var cellEditProp = {
  mode: "click",
  blurToSave: true,
  afterSaveCell: onAfterSaveCell
};

var options = {
  // page: 3,
  // sizePerPage: 5,
  // sizePerPageList: [5,10,15,20],
  // paginationSize: 6,
  sortName: "name",  //default sort column name
  sortOrder: "desc",  //default sort order
  afterTableComplete: onAfterTableComplete, // A hook for after table render complete.
  afterDeleteRow: onAfterDeleteRow,  // A hook for after droping rows.
  afterInsertRow: onAfterInsertRow   // A hook for after insert rows
};


function priceFormatter(cell, row){
  return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
}

React.render(
  <BootstrapTable data={products} striped={true} hover={true} pagination={true} selectRow={selectRowProp} cellEdit={cellEditProp}
                  insertRow={true} deleteRow={true} search={true} columnFilter={true} options={options}>
      <TableHeaderColumn dataField="id" dataAlign="center" dataSort={true} isKey={true}>Product ID</TableHeaderColumn>
      <TableHeaderColumn dataField="name" dataSort={true}>Product Name</TableHeaderColumn>
      <TableHeaderColumn dataField="price" dataFormat={priceFormatter} editable={false}>Product Price</TableHeaderColumn>
  </BootstrapTable>,
	document.getElementById("basic")
);
