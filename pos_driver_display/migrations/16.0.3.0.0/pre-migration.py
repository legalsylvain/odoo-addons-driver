# Copyright (C) 2024 - Today: GRAP (http://www.grap.coop)
# @author: Sylvain LE GAL (https://twitter.com/legalsylvain)
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).

from openupgradelib import openupgrade

column_renames = {
    "pos_config": [
        ("customer_display_msg_next_l1", None),
        ("customer_display_msg_next_l2", None),
        ("customer_display_msg_closed_l1", None),
        ("customer_display_msg_closed_l2", None),
    ],
}


@openupgrade.migrate()
def migrate(env, version):
    openupgrade.rename_columns(env.cr, column_renames)
