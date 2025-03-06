package com.sneakpeak.bricool.permission;

import lombok.Getter;
import lombok.RequiredArgsConstructor;


@Getter
@RequiredArgsConstructor
public enum PermissionType {

        VIEW_JOBS("view_jobs"),
        SUBMIT_REQUEST("submit_request"),
        CANCEL_REQUEST("cancel_request"),

        VIEW_OFFERS("view_offs"),
        ACCEPT_REJECT_OFFERS("ac_rej_offs"),
        VIEW_PARTICIPATION_HISTORY("view_part"),

        CREATE_MANAGE_CATEGORIES("manage_cat"),
        MANAGE_USERS("manage_users"),
        VIEW_PLATFORM_STATS("view_stats");


        private final String permission;
}




