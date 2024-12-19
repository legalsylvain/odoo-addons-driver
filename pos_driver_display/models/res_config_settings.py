# Copyright (C) 2024 - Today: GRAP (http://www.grap.coop)
# @author: Sylvain LE GAL (https://twitter.com/legalsylvain)
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).

from odoo import fields, models


class ResConfigSettings(models.TransientModel):
    _inherit = "res.config.settings"

    pos_iface_customer_display = fields.Boolean(
        related="pos_config_id.iface_customer_display", readonly=False
    )
    pos_customer_display_message_next = fields.Text(
        related="pos_config_id.customer_display_message_next", readonly=False
    )
    pos_customer_display_message_closed = fields.Text(
        related="pos_config_id.customer_display_message_closed", readonly=False
    )
