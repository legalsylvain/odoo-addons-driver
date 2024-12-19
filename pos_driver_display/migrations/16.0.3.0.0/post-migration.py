# Copyright (C) 2024 - Today: GRAP (http://www.grap.coop)
# @author: Sylvain LE GAL (https://twitter.com/legalsylvain)
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).

from openupgradelib import openupgrade


@openupgrade.migrate()
def migrate(env, version):
    # TODO, concatenate and set \n between text

    # customer_display_msg_next_l1
    # customer_display_msg_next_l2
    # -> customer_display_message_next

    # customer_display_msg_closed_l1
    # customer_display_msg_closed_l2
    # -> customer_display_message_closed

    pass
