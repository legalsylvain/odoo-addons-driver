/** @odoo-module **/

// Copyright (C) 2024 - Today: GRAP (http://www.grap.coop)
// @author: Sylvain LE GAL (https://twitter.com/legalsylvain)
// License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).

import {Order, Orderline, PosGlobalState} from "point_of_sale.models";
import Registries from "point_of_sale.Registries";

// /////////////////////////////
// Overload models.PosGlobalState
// /////////////////////////////

const OverloadPosGlobalState = (OriginalPosGlobalState) =>
    class extends OriginalPosGlobalState {
        constructor(obj) {
            // Send_message_customer_display is a variable that allow
            // to disable the send of the message to the customer display
            // This desing is due to the current design of Odoo PoS.
            // 1) during the call_of_init_from_JSON, a call to
            // add_product and remove_orderline is done.
            // 2) during the call of add_product, a call
            // to set_price, set_discount, set_quantity is done.
            // To avoid multiple useless messages sends.
            var res = super(obj);
            this.send_message_customer_display = true;
            return res;
        }

        add_new_order() {
            var send_message = this.send_message_customer_display;
            this.send_message_customer_display = false;
            var res = super.add_new_order(...arguments);
            if (send_message) {
                this.env.proxy.customer_display_send_welcome_message();
                this.send_message_customer_display = send_message;
            }
            return res;
        }
    };

Registries.Model.extend(PosGlobalState, OverloadPosGlobalState);

// /////////////////////////////
// Overload models.Order
// /////////////////////////////

const OverloadOrder = (OriginalOrder) =>
    class extends OriginalOrder {
        init_from_JSON() {
            var send_message = this.pos.send_message_customer_display;
            this.pos.send_message_customer_display = false;
            var res = super.init_from_JSON(...arguments);
            this.pos.send_message_customer_display = send_message;
            return res;
        }

        add_product() {
            var send_message = this.pos.send_message_customer_display;
            this.pos.send_message_customer_display = false;
            super.add_product(...arguments);
            if (send_message) {
                this.pos.env.proxy.customer_display_send_order_line(
                    this.get_selected_orderline(),
                    "add_line"
                );
                this.pos.send_message_customer_display = send_message;
            }
        }
    };

Registries.Model.extend(Order, OverloadOrder);

// /////////////////////////////
// Overload models.Orderline
// /////////////////////////////

const OverloadOrderline = (OriginalOrderline) =>
    class extends OriginalOrderline {

        set_discount() {
            var send_message = this.pos.send_message_customer_display;
            this.pos.send_message_customer_display = false;
            super.set_discount(...arguments);

            if (send_message) {
                this.pos.env.proxy.customer_display_send_order_line(
                    this,
                    "update_discount"
                );
                this.pos.send_message_customer_display = send_message;
            }
        }

        set_unit_price() {
            var send_message = this.pos.send_message_customer_display;
            this.pos.send_message_customer_display = false;
            super.set_unit_price(...arguments);

            if (send_message) {
                this.pos.env.proxy.customer_display_send_order_line(
                    this,
                    "update_unit_price"
                );
                this.pos.send_message_customer_display = send_message;
            }
        }

        set_quantity(quantity) {
            if (quantity === "remove") {
                if (this.pos.send_message_customer_display) {
                    this.pos.env.proxy.customer_display_send_order_line(
                        this,
                        "remove_line"
                    );
                }
                return super.set_quantity(...arguments);
            }
            var result = super.set_quantity(...arguments);
            if (this.pos.send_message_customer_display) {
                this.pos.env.proxy.customer_display_send_order_line(
                    this,
                    "update_quantity"
                );
            }
            return result;
        }
    };

Registries.Model.extend(Orderline, OverloadOrderline);
