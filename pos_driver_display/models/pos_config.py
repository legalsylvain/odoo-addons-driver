# © 2014-2016 Aurélien DUMAINE
# © 2015-2016 Akretion (Alexis de Lattre <alexis.delattre@akretion.com>)
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo import _, api, fields, models


class PosConfig(models.Model):
    _inherit = "pos.config"

    iface_customer_display = fields.Boolean(
        string="LED Customer Display", help="Display data on the customer display"
    )

    customer_display_message_next = fields.Text(
        string="Next Customer Message",
        default=lambda x: x._default_customer_display_message_next(),
        help="Message on the customer display which is "
        "displayed after starting POS and also after validation of an order",
    )

    customer_display_message_closed = fields.Text(
        string="Close Message",
        default=lambda x: x._default_customer_display_message_closed(),
        help="Message on the customer display which " "is displayed when POS is closed",
    )

    @api.model
    def _default_customer_display_message_next(self):
        return _("Point of Sale Open\n" "Welcome!")

    @api.model
    def _default_customer_display_message_closed(self):
        return _("Point of Sale Closed\n" "See you soon!")
