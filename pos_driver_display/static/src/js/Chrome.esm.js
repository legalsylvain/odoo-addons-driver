// Copyright (C) 2024 - Today: GRAP (http://www.grap.coop)
// @author: Sylvain LE GAL (https://twitter.com/legalsylvain)
// License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).

odoo.define("pos_driver_display.Chrome", function (require) {
    const Chrome = require("point_of_sale.Chrome");
    const Registries = require("point_of_sale.Registries");

    const OverloadChrome = (OriginalChrome) =>
        class extends OriginalChrome {
            async start() {
                await super.start();
                this.env.proxy.customer_display_send_welcome_message();
            }

            async _closePos() {
                await super._closePos();
                this.env.proxy.customer_display_send_close_message();
            }
        };

    Registries.Component.extend(Chrome, OverloadChrome);

    return Chrome;
});
