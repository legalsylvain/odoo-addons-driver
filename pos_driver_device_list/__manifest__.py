# Copyright (C) 2024 - Today: GRAP (http://www.grap.coop)
# @author: Sylvain LE GAL (https://twitter.com/legalsylvain)
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).

{
    "name": "Point of Sale - Devices List (odoo-pos-driver)",
    "version": "16.0.2.0.0",
    "category": "Point Of Sale",
    "summary": "Get devices information from odoo-pos-driver library",
    "author": "GRAP",
    "website": "https://github.com/grap/odoo-addons-pos",
    "license": "AGPL-3",
    "depends": ["point_of_sale"],
    "assets": {
        "point_of_sale.assets": [
            "pos_driver_device_list/static/src/js/devices.esm.js",
        ],
    },
    "data": [
        "security/ir.model.access.csv",
        "security/ir_rule.xml",
        "views/view_pos_device.xml",
    ],
    "installable": True,
}
