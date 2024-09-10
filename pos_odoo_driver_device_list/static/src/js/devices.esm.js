// Copyright (C) 2024 - Today: GRAP (http://www.grap.coop)
// @author: Sylvain LE GAL (https://twitter.com/legalsylvain)
// License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).

odoo.define("pos_odoo_driver_device_list.devices", function (require) {

    var ProxyDevice = require("point_of_sale.devices").ProxyDevice;

    var set_connection_status_super = ProxyDevice.prototype.set_connection_status;

    ProxyDevice.prototype.set_connection_status = function (status, drivers, msg='') {
        if (status === 'connected' && drivers !== undefined) {
            var old_drivers = this.get('status').drivers;
            var changes = {};
            Object.entries(drivers).forEach(([driver_name, driver_value]) => {
                if (driver_value.status === "connected") {
                    if (JSON.stringify(driver_value) !== JSON.stringify(old_drivers[driver_name])) {
                        changes[driver_name] = driver_value;
                    }
                }
            })
            if (Object.keys(changes).length !== 0) {
                this.env.services.rpc({
                    model: 'pos.config',
                    method: 'update_pos_device',
                    args: [this.env.pos.config.id, changes],
                    kwargs: {context: this.env.session.user_context},
                }, {})
                .then(function (result) {
                    console.log("THEN: ", result)
                }).catch(function (error){
                    console.warn('catch: ', error);
                });

                console.log("CHANGES: ", changes)
            }
        }
        set_connection_status_super.call(this, status, drivers, msg);
    };

});
