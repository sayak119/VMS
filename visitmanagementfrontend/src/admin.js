import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class Admin extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            value: 'Please write an essay about your favorite DOM element.'
        };
        this.data = ['ayush', 'ashfv', 'dfv'];
        this.message = "";
        this.geteventdata = this.geteventdata.bind(this)
        this.geteventdata()

    }

    async geteventdata(event = null) {
        const res = await fetch('http://127.0.0.1:8000/admin', {
            method: 'GET',
        });
        const data = await res.json();
        this.data = data
    }


    render() {
        return (
            <html lang="en">
            <head>
                <title>Sortable Tabular Data</title>

            </head>
            <body>
            <body>
            <div id="wrapper">
                <h1>Sortable Table of Search Queries</h1>

                <table id="keywords" cellSpacing="0" cellPadding="0">
                    <thead>
                    <tr>
                        <th><span>Keywords</span></th>
                        <th><span>Impressions</span></th>
                        <th><span>Clicks</span></th>
                        <th><span>CTR</span></th>
                        <th><span>Rank</span></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="lalign">silly tshirts</td>
                        <td>6,000</td>
                        <td>110</td>
                        <td>1.8%</td>
                        <td>22.2</td>
                    </tr>
                    <tr>
                        <td className="lalign">desktop workspace photos</td>
                        <td>2,200</td>
                        <td>500</td>
                        <td>22%</td>
                        <td>8.9</td>
                    </tr>


                    </tbody>
                </table>
            </div>
            </body>
            <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
            <script
                src='https://cdnjs.cloudflare.com/ajax/libs/jquery.tablesorter/2.28.14/js/jquery.tablesorter.min.js'></script>
            <script src="./script.js"></script>

            </body>
            </html>


    );}


    }


    export default Admin;