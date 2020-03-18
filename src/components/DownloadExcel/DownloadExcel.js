import React, { Component } from 'react';
import ReactExport from 'react-export-excel';
import { connect } from 'react-redux';

const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
// const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ObjectsToCsv = require('objects-to-csv');


class DownloadExcel extends Component {
    render() {

        const dataSet1 = [
            {
                name: "Johson",
                amount: 30000,
                sex: 'M',
                is_married: true
            },
            {
                name: "Monika",
                amount: 355000,
                sex: 'F',
                is_married: false
            },
            {
                name: "John",
                amount: 250000,
                sex: 'M',
                is_married: false
            },
            {
                name: "Josef",
                amount: 450500,
                sex: 'M',
                is_married: true
            }
        ];

        return (
            <ExcelFile element={<button><img src="https://img.icons8.com/color/48/000000/ms-excel.png"/></button>}>
                {new ObjectsToCsv(this.props.reduxStore.chartDataExcel)}
                
                {/* <ExcelSheet data={dataSet1} name={this.props.queryParams.yaxis}>
                    


                    <ExcelColumn label="Name" value="name"/>
                    <ExcelColumn label="Wallet Money" value="amount"/>
                    <ExcelColumn label="Gender" value="sex"/>
                    <ExcelColumn label="Marital Status"
                                 value={(col) => col.is_married ? "Married" : "Single"}/>
                </ExcelSheet> */}
            </ExcelFile>
        );
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(DownloadExcel);