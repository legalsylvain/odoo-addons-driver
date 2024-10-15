// Copyright (C) 2024 - Today: GRAP (http://www.grap.coop)
// @author: Sylvain LE GAL (https://twitter.com/legalsylvain)
// License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).

odoo.define("pos_odoo_driver_payment.PaymentScreen", function (require) {

    const PaymentScreen = require("point_of_sale.PaymentScreen");
    const Registries = require("point_of_sale.Registries");
    const { useListener } = require("@web/core/utils/hooks");

    const OverloadPaymentScreen = (OriginalPaymentScreen) =>
        class extends OriginalPaymentScreen {

            setup() {
                super.setup();
                useListener('send-payment-terminal', this.SendPaymentTerminal);
            }

            SendPaymentTerminal(event) {
                var self = this;
                const { cid } = event.detail;
                const payment_line = this.paymentLines.find((line) => line.cid === cid);
                this.env.proxy.payment_terminal_push_amount(payment_line)
                .then(function (result) {
                    if (!result) {
                        self.showPopup('ErrorTracebackPopup', {
                            title: self.env._t('Communication failed'),
                            body: self.env._t('Possible reasons: \n- the terminal payment is not connected\n- the device is busy for the time being (still processing a payment).'),
                        });
                    }

                });
            }

        };

    Registries.Component.extend(PaymentScreen, OverloadPaymentScreen);
    return PaymentScreen;
});
