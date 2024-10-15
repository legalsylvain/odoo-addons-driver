# Copyright (C) 2024 - Today: GRAP (http://www.grap.coop)
# @author: Sylvain LE GAL (https://twitter.com/legalsylvain)
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).

from datetime import datetime

from odoo import api, fields, models


class PosConfig(models.Model):
    _inherit = "pos.config"

    device_ids = fields.One2many(comodel_name="pos.device", inverse_name="config_id")

    @api.model
    def update_pos_device(self, config_id, changes):
        PosDevice = self.env["pos.device"]
        for device_type, device_info in changes.items():
            existing_device = PosDevice.search(
                [
                    ("config_id", "=", config_id),
                    ("device_type", "=", device_type),
                    ("name", "=", device_info.get("device_name", False)),
                    ("product_name", "=", device_info.get("product_name", False)),
                    ("manufacturer", "=", device_info.get("manufacturer", False)),
                    ("serial_number", "=", device_info.get("serial_number", False)),
                    (
                        "vendor_product_code",
                        "=",
                        device_info.get("vendor_product_code", False),
                    ),
                ],
                limit=1,
                order="last_connexion_date desc",
            )
            if existing_device:
                existing_device.write({"last_connexion_date": datetime.now()})
            else:
                PosDevice.create(
                    {
                        "config_id": config_id,
                        "device_type": device_type,
                        "name": device_info.get("device_name", False),
                        "product_name": device_info.get("product_name", False),
                        "manufacturer": device_info.get("manufacturer", False),
                        "serial_number": device_info.get("serial_number", False),
                        "vendor_product_code": device_info.get(
                            "vendor_product_code", False
                        ),
                        "last_connexion_date": datetime.now(),
                    }
                )
        return True
