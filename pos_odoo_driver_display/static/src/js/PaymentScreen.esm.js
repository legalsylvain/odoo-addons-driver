// Copyright (C) 2024 - Today: GRAP (http://www.grap.coop)
// @author: Sylvain LE GAL (https://twitter.com/legalsylvain)
// License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).

odoo.define("pos_odoo_driver_display.PaymentScreen", function (require) {
    const {onRendered} = owl;
    const PaymentScreen = require("point_of_sale.PaymentScreen");
    const Registries = require("point_of_sale.Registries");

    const OverloadPaymentScreen = (OriginalPaymentScreen) =>
        class extends OriginalPaymentScreen {

            setup() {
                var self = this;
                super.setup();

                onRendered(() => {
                    self.env.proxy.customer_display_send_payment(self.currentOrder);
                });
            }

        };

    Registries.Component.extend(PaymentScreen, OverloadPaymentScreen);
    return PaymentScreen;
});
