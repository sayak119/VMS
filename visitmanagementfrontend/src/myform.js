import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class EssayForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'Please write an essay about your favorite DOM element.'
        };

        this.message = "";
        this.hostSubmit = this.hostSubmit.bind(this);
        this.checkinSubmit = this.checkinSubmit.bind(this);
        this.checkoutSubmit = this.checkoutSubmit.bind(this);

        this.checkinSubmitFetch = this.checkinSubmitFetch.bind(this);
        this.hostSubmitfetch = this.hostSubmitfetch.bind(this);
        this.checkoutSubmitFetch = this.checkoutSubmitFetch.bind(this);
    }


    checkoutSubmit(event) {
        this.checkoutSubmitFetch(event);
        event.preventDefault();
    }

    checkinSubmit(event) {
        this.checkinSubmitFetch(event);
        event.preventDefault();

    }

    hostSubmit(event) {
        this.hostSubmitfetch(event);
        event.preventDefault();

    }

    async checkoutSubmitFetch(event) {
        let token = event.target.token.value;
        let data = JSON.stringify({'token': token});
        const res = await fetch('http://127.0.0.1:8000/checkout', {
            method: 'POST',
            body: data
        });
        const json = await res;
        console.log(json);
        if (json.status === 404) {
            window.alert('No Token Found. ')
        }

    }

    async checkinSubmitFetch(event) {
        let name = event.target.name.value;
        let phone = event.target.phone.value;
        let guestemail = event.target.guestemail.value;
        let hostemail = event.target.hostemail.value;
        let data = {
            "name": name,
            "phone": phone,
            "guestemail": guestemail,
            "hostemail": hostemail
        };

        const res = await fetch('http://127.0.0.1:8000/checkin', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        const json = await res;
        console.log(json);
        if (json.status === 404) {
            window.alert('Host Not Found.')
        }

    }


    async hostSubmitfetch(event) {
        let name = event.target.name.value;
        let phone = event.target.phone.value;
        let guestemail = event.target.guestemail.value;
        let address = event.target.address.value;
        let data = {
            "name": name,
            "phone": phone,
            "email": guestemail,
            "address": address
        };

        const res = await fetch('http://127.0.0.1:8000/host', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        const json = await res;
        console.log(json.status);
    }


    render() {
        return (

            <Router>
                <Switch>
                    <Route exact path="/">
                        <Link to="/host">I am Host</Link>
                        <div className="form">

                            <ul className="tab-group">
                                <li className="tab active"><Link to="/checkin">Check In</Link></li>
                                <li className="tab"><Link to="/checkout">Check Out</Link></li>
                            </ul>
                            <div className="tab-content">
                                <div id="checkin">
                                    <h1>Welcome </h1>

                                    <form onSubmit={this.checkinSubmit}>


                                        <div className="field-wrap">
                                            <input type="text" name="name" placeholder="Name" required
                                                   autoComplete="off"/>
                                        </div>
                                        <div className="field-wrap">
                                            <input type="tel" name="phone" placeholder="Phone" required
                                                   autoComplete="off"/>
                                        </div>
                                        <div className="field-wrap">
                                            <input type="email" name="guestemail" placeholder="Your Email" required
                                                   autoComplete="off"/>
                                        </div>
                                        <div className="field-wrap">
                                            <input type="email" name="hostemail" placeholder="Host Email" required
                                                   autoComplete="off"/>
                                        </div>


                                        <button type="submit" className="button button-block">
                                            Check In
                                        </button>

                                    </form>

                                </div>

                                <div id="checkout">
                                    <h1>Please Visit Again</h1>

                                    <form onSubmit={this.checkoutSubmit}>

                                        <div className="field-wrap">
                                            <input type="text" name="token" placeholder="Token" required
                                                   autoComplete="off"/>
                                        </div>


                                        <button className="button button-block">
                                            Check Out
                                        </button>

                                    </form>

                                </div>

                            </div>
                        </div>

                    </Route>
                    <Route path="/host">
                        <div className="form">


                            <div id="host">
                                <h1>Welcome Host</h1>

                                <form onSubmit={this.hostSubmit}>


                                    <div className="field-wrap">
                                        <input type="text" name="name" placeholder="Name" required autoComplete="off"/>
                                    </div>
                                    <div className="field-wrap">
                                        <input type="tel" name="phone" placeholder="Phone" required autoComplete="off"/>
                                    </div>
                                    <div className="field-wrap">
                                        <input type="email" name="guestemail" placeholder="Email" required
                                               autoComplete="off"/>
                                    </div>
                                    <div className="field-wrap">
                                        <input type="text" name="address" placeholder="Address" required
                                               autoComplete="off"/>
                                    </div>


                                    <button type="submit" className="button button-block">
                                        Register
                                    </button>

                                </form>

                            </div>
                        </div>
                    </Route>
                    <Route path="/checkin">
                        <div className="form">

                            <ul className="tab-group">
                                <li className="tab active"><Link to="/checkin">Check In</Link></li>
                                <li className="tab"><Link to="/checkout">Check Out</Link></li>
                            </ul>
                            <div className="tab-content">
                                <h1>Welcome </h1>

                                <form onSubmit={this.checkinSubmit}>


                                    <div className="field-wrap">
                                        <input type="text" name="name" placeholder="Name" required
                                               autoComplete="off"/>
                                    </div>
                                    <div className="field-wrap">
                                        <input type="tel" name="phone" placeholder="Phone" required
                                               autoComplete="off"/>
                                    </div>
                                    <div className="field-wrap">
                                        <input type="email" name="guestemail" placeholder="Your Email" required
                                               autoComplete="off"/>
                                    </div>
                                    <div className="field-wrap">
                                        <input type="email" name="hostemail" placeholder="Host Email" required
                                               autoComplete="off"/>
                                    </div>


                                    <button type="submit" className="button button-block">
                                        Check In
                                    </button>

                                </form>


                            </div>
                        </div>
                    </Route>
                    <Route path="/checkout">
                        <div className="form">

                            <ul className="tab-group">
                                <li className="tab active"><Link to="/checkin">Check In</Link></li>
                                <li className="tab"><Link to="/checkout">Check Out</Link></li>
                            </ul>
                            <div className="tab-content">


                                <h1>Please Visit Again</h1>

                                <form onSubmit={this.checkoutSubmit}>

                                    <div className="field-wrap">
                                        <input type="text" name="token" placeholder="Token" required
                                               autoComplete="off"/>
                                    </div>


                                    <button className="button button-block">
                                        Check Out
                                    </button>

                                </form>


                            </div>
                        </div>
                    </Route>
                </Switch>
            </Router>

        );
    }
}

export default EssayForm;