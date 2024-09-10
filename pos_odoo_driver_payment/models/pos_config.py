# Copyright (C) 2024 - Today: GRAP (http://www.grap.coop)
# @author: Sylvain LE GAL (https://twitter.com/legalsylvain)
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).

from odoo import api, fields, models


class PosConfig(models.Model):
    _inherit = "pos.config"

    iface_payment_terminal = fields.Boolean(
        "Payment Terminal",
        help="A payment terminal is available on the Proxy",
        compute="_compute_iface_payment_terminal",
        store=True,
    )

    @api.depends("payment_method_ids.is_payment_terminal")
    def _compute_iface_payment_terminal(self):
        for config in self:
            config.iface_payment_terminal = any(
                config.mapped("payment_method_ids.is_payment_terminal")
            )
