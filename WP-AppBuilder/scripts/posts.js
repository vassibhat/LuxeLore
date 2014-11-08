(function (global) {
    var app = global.app = global.app || {};
    
    UsersViewModel = kendo.data.ObservableObject.extend({
        usersDataSource: null,

        init: function () {
            var that = this,
                dataSource;
            kendo.data.ObservableObject.fn.init.apply(that, []);
            
            dataSource = new kendo.data.DataSource({
                schema : {
                    model: 
                    {
                        id: "id",
                        nicename: "nicename",
                        parent: "parent"
                    }
                },
                transport: {
                    read: function (options) {
                    $.ajax({
                        type: "GET",
                		url: "http://wpapidemo.stavrev.eu/api/get_recent_posts/",
                        dataType: "json",
                        success: function (result) {
                            options.success(result.posts);
                            console.log("read success");
                        },
                        error: function (result) {
                            console.log("read error: " + result);
                        }
                    });
                }
                }
            });
            //that.set("usersDataSource", dataSource);
            
            that.usersDataSource = dataSource;
        }
    });
    
    app.usersService = {
        viewModel: new UsersViewModel()
    };
})(window);