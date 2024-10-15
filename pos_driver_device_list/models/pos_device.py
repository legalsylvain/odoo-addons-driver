# Copyright (C) 2024 - Today: GRAP (http://www.grap.coop)
# @author: Sylvain LE GAL (https://twitter.com/legalsylvain)
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).

from odoo import fields, models


class PosDevice(models.Model):
    _name = "pos.device"
    _description = "Point of Sale Devices"
    _order = "last_connexion_date desc, name"

    device_type = fields.Selection(
        selection=[
            ("display", "Customer Display"),
            ("payment", "Payment Terminal"),
            ("scale", "Scale"),
            ("printer", "Printer"),
        ]
    )

    config_id = fields.Many2one(comodel_name="pos.config")

    company_id = fields.Many2one(related="config_id.company_id")

    name = fields.Char(readonly=True)

    product_name = fields.Char(readonly=True)

    vendor_product_code = fields.Char(readonly=True)

    serial_number = fields.Char(readonly=True)

    manufacturer = fields.Char(readonly=True)

    last_connexion_date = fields.Datetime(readonly=True)

    def _default_company_id(self):
        return self.env.company
