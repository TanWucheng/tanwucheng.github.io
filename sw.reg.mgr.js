(function () {
    /**
     * 注册Service Worker
     * @param {*} config 配置项目
     */
    const register = (config) => {
        //浏览器是否支持
        if ("serviceWorker" in navigator) {
            let swUrl = `${config.path}/${config.name}?v=${config.ver}`;
            // 通过ver的变化来强制进行更新操作，每次更新sw.js时进行ver+1操作
            navigator.serviceWorker
                .register(swUrl)
                .then((swReg) => {
                    console.log("Service Worker注册成功");
                    if (config && config.onRegister) {
                        config.onRegister(swReg);
                    }

                    swReg.onupdatefound = (e) => {
                        let installingWorker = swReg.installing;
                        if (!installingWorker) {
                            return;
                        }
                        installingWorker.onstatechange = (e) => {
                            if (installingWorker.state === "installed") {
                                if (navigator.serviceWorker.controller) {
                                    config.log &&
                                        console.log("Service Worker已安装更新");
                                    if (config && config.onUpdate) {
                                        config.onUpdate(swReg);
                                    }
                                } else {
                                    config.log &&
                                        console.log("Service Worker已安装");
                                    if (config && config.onSuccess) {
                                        config.onSuccess(swReg);
                                    }
                                }
                            }
                        };
                    };
                })
                .catch((err) => {
                    if (config && config.onError) {
                        config.onError(err);
                    }
                    console.error("Service Worker注册期间发生错误:", err);
                });

            if (navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage(
                    "这是从window环境postMessage()"
                );

                const channel = new MessageChannel();
                channel.port1.onmessage = (e) => {
                    console.log(
                        `${new Date().toLocaleString()}, index.html port1收到消息:${e.data
                        }`
                    );
                };
                // 向port2发送消息
                navigator.serviceWorker.controller.postMessage(
                    "这是index.html向port2 postMessage()",
                    [channel.port2]
                );
            }

            navigator.serviceWorker.onmessage = (e) => {
                console.log(
                    `${new Date().toLocaleString()}, index.html收到的消息: ${e.data
                    }`
                );
            };
        }
    };

    /**
     * 注销Service Worker
     */
    const unregister = () => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.ready.then((swReg) => {
                swReg.unregister((result) => {
                    result && console.log("Service Worker注销成功");
                });
            });
        }
    };

    const broad = new BroadcastChannel("c1");
    broad.onmessage = (e) => {
        console.log(
            `${new Date().toLocaleString()}, index.html收到的Service Worker广播消息:${e.data
            }`
        );
    };

    //注册sw.js
    register({
        ver: 1,
        path: "",
        name: "sw.js",
        log: true,
        onRegister: () => { },
        onSuccess: () => { },
        onUpdate: () => { },
        onError: (err) => { },
    });
})();
