// Copyright (C) 2024 - Today: GRAP (http://www.grap.coop)
// @author: Sylvain LE GAL (https://twitter.com/legalsylvain)
// License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).

odoo.define("pos_odoo_driver_payment.ProxyStatus", function (require) {
    var Registries = require("point_of_sale.Registries");
    var ProxyStatus = require("point_of_sale.ProxyStatus");

    const OverloadProxyStatus = (OriginalProxyStatus) =>
        class extends OriginalProxyStatus {
            _setStatus(newStatus) {
                super._setStatus(newStatus);
                if (
                    newStatus.status === "connected" &&
                    this.env.pos.config.iface_payment_terminal
                ) {
                    var paymentStatus = newStatus.drivers.payment
                        ? newStatus.drivers.payment.status
                        : false;
                    if (
                        paymentStatus !== "connected" &&
                        paymentStatus !== "connecting"
                    ) {
                        if (this.state.msg) {
                            this.state.msg =
                                this.env._t("EPT") + " & " + this.state.msg;
                        } else {
                            this.state.msg = this.env._t("EPT Offline");
                            this.state.status = "warning";
                        }
                    }
                }
            }
        };

    Registries.Component.extend(ProxyStatus, OverloadProxyStatus);
});
