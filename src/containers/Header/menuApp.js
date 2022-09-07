export const adminMenu = [
    { //// hệ thống
        name: 'menu.system.header'
        , menus: [
            { //// Quản trị hệ thống
                name: 'menu.system.system-administrator.header',
                subMenus: [
                    { name: 'menu.system.system-administrator.product-manage', link: '/system/product-manage' },
                    { name: 'menu.system.system-administrator.register-package-group-or-account', link: '/system/register-package-group-or-account' },
                ],


            },

            {////
                name: 'menu.system.user-manage.header',
                subMenus: [
                    { name: 'menu.system.user-manage.without-redux', link: '/system/user-manage' },
                    { name: 'menu.system.user-manage.with-redux', link: '/system/user-manage-redux' },
                ]
            },
        ],

    },

    // { //// hệ thống
    //     name: 'menu.system.clinic-manage.header'
    //     , menus: [
    //         { //// Quản trị hệ thống
    //             name: 'menu.system.system-administrator.header',
    //             subMenus: [
    //                 { name: 'menu.system.system-administrator.product-manage', link: '/system/product-manage' },
    //                 { name: 'menu.system.system-administrator.register-package-group-or-account', link: '/system/register-package-group-or-account' },
    //             ],


    //         },

    //         {////
    //             name: 'menu.system.user-manage.header',
    //             subMenus: [
    //                 { name: 'menu.system.user-manage.without-redux', link: '/system/user-manage' },
    //                 { name: 'menu.system.user-manage.with-redux', link: '/system/user-manage-redux' },
    //             ]
    //         },
    //     ],

    // },
];