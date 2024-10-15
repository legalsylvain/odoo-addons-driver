# Copyright (C) 2024 - Today: GRAP (http://www.grap.coop)
# @author: Sylvain LE GAL (https://twitter.com/legalsylvain)
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).

{
    "name": "Point of Sale - LED Customer Display (odoo-pos-driver)",
    "version": "16.0.2.0.0",
    "category": "Point Of Sale",
    "summary": "Communicate with LEC Customer Display via odoo-pos-driver library",
    "author": "GRAP",
    "website": "https://github.com/grap/odoo-addons-pos",
    "license": "AGPL-3",
    "depends": ["point_of_sale"],
    "assets": {
        "point_of_sale.assets": [
            "pos_driver_display/static/src/js/devices.esm.js",
            "pos_driver_display/static/src/js/ProxyStatus.esm.js",
            "pos_driver_display/static/src/js/models.esm.js",
            "pos_driver_display/static/src/js/Chrome.esm.js",
            "pos_driver_display/static/src/js/PaymentScreen.esm.js",
        ],
    },
    "data": ["views/view_pos_config.xml"],
    "installable": True,
}
