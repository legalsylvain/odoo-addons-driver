# Copyright (C) 2024 - Today: GRAP (http://www.grap.coop)
# @author: Sylvain LE GAL (https://twitter.com/legalsylvain)
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).

{
    "name": "Point of Sale - Telium Payment Terminal (odoo-pos-driver)",
    "version": "16.0.2.0.0",
    "category": "Point Of Sale",
    "summary": "Communicate with Telium Payment Terminal"
    " via odoo-pos-driver library",
    "author": (
        "Aurélien DUMAINE,"
        "GRAP,"
        "Akretion,"
        "ACSONE SA/NV,"
        "Odoo Community Association (OCA)"
    ),
    "website": "https://github.com/grap/odoo-addons-pos",
    "license": "AGPL-3",
    "depends": ["point_of_sale"],
    "assets": {
        "point_of_sale.assets": [
            "pos_driver_payment/static/src/css/pos.css",
            "pos_driver_payment/static/src/js/devices.esm.js",
            "pos_driver_payment/static/src/js/ProxyStatus.esm.js",
            "pos_driver_payment/static/src/js/PaymentScreen.esm.js",
            "pos_driver_payment/static/src/xml/PaymentScreenPaymentLines.xml",
        ],
    },
    "data": [
        "views/view_res_config_settings.xml",
        "views/view_pos_payment_method.xml",
    ],
    "installable": True,
}
