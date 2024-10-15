// Copyright (C) 2024 - Today: GRAP (http://www.grap.coop)
// @author: Sylvain LE GAL (https://twitter.com/legalsylvain)
// License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).

odoo.define("pos_driver_payment.devices", function (require) {

    var ProxyDevice = require("point_of_sale.devices").ProxyDevice;

    ProxyDevice.include({

        payment_terminal_push_amount: function (payment_line) {
            var data = {
                amount: payment_line.amount,
                currency_iso: this.pos.currency.name,
            };
            return this.message(
                "payment_terminal_transaction_start",
                {payment_info: JSON.stringify(data)}
            )
        },

    });
});
