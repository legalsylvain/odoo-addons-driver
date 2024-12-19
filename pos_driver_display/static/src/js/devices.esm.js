// Copyright (C) 2024 - Today: GRAP (http://www.grap.coop)
// @author: Sylvain LE GAL (https://twitter.com/legalsylvain)
// License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).

odoo.define("pos_driver_display.devices", function (require) {
    var ProxyDevice = require("point_of_sale.devices").ProxyDevice;

    ProxyDevice.include({
        customer_display_send_welcome_message() {
            this._customer_display_send_text(
                this.pos.config.customer_display_message_next
            );
        },

        customer_display_send_close_message() {
            this._customer_display_send_text(
                this.pos.config.customer_display_message_closed
            );
        },

        _customer_display_send_text: function (text_lines) {
            var data = {
                text_lines: text_lines,
                action: "display_lines",
            };
            this.message("display_show", {data: JSON.stringify(data)});
        },

        customer_display_send_payment: function (order) {
            var data = {
                total: order.get_total_with_tax(),
                total_paid: order.get_total_paid(),
                total_due: order.get_due(),
                action: "payment_balance",
            };
            this.message("display_show", {data: JSON.stringify(data)});
        },

        customer_display_send_order_line: function (orderline, action) {
            var data = {
                product_name: orderline.product.display_name,
                quantity: orderline.quantity,
                discount: orderline.discount,
                unit_price: orderline.get_unit_price(),
                total: orderline.get_display_price(),
                action: action,
            };
            this.message("display_show", {data: JSON.stringify(data)});
        },
    });
});
