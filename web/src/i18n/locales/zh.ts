const zh = {
  translation: {
    common: {
      confirm: '确认',
      cancel: '取消',
      delete: '删除',
      actionFailed: '操作失败',
      loading: '正在从设备加载设置...',
      loadFailed: '无法从设备加载设置',
      retry: '重试'
    },
    head: {
      desktop: '远程桌面',
      login: '登录',
      changePassword: '修改密码',
      terminal: '终端',
      wifi: 'Wi-Fi'
    },
    auth: {
      login: '登录',
      placeholderUsername: '请输入用户名',
      placeholderPassword: '请输入密码',
      placeholderPassword2: '请再次输入密码',
      noEmptyUsername: '用户名不能为空',
      noEmptyPassword: '密码不能为空',
      invalidUser: '用户名或密码错误',
      locked: '登录太频繁，请稍后再试',
      globalLocked: '系统防爆破保护中，请稍后再试',
      error: '未知错误',
      changePassword: '修改密码',
      differentPassword: '两次密码不一致',
      illegalUsername: '用户名中包含非法字符',
      forgetPassword: '忘记密码',
      ok: '确定',
      cancel: '取消',
      loginButtonText: '登录',
      tips: {
        change1: '请注意，此操作将同时更新以下密码：',
        change2: '网页的登录密码'
      }
    },
    wifi: {
      title: 'Wi-Fi',
      description: '配置 NanoKVM Wi-Fi 信息',
      invalidMode: '当前模式不支持配置网络。请先前往设备启用 Wi-Fi 配置模式。',
      confirmBtn: '确定',
      finishBtn: '完成',
      ap: {
        authTitle: '身份验证',
        authDescription: '请输入 AP 密码以继续',
        authFailed: '密码错误',
        passPlaceholder: 'AP 密码',
        verifyBtn: '验证'
      }
    },
    screen: {
      scale: '缩放',
      title: '屏幕',
      video: '视频模式',
      resolution: '分辨率',
      auto: '自动',
      autoTips:
        '在某些分辨率下可能存在花屏或鼠标偏移的情况，请调整远程主机分辨率或者不使用自动模式。',
      fps: '帧率',
      customizeFps: '自定义',
      quality: '图像质量',
      qualityLossless: '无损',
      qualityHigh: '高',
      qualityMedium: '中',
      qualityLow: '低',
      frameDetect: '帧差检测',
      frameDetectTip: '计算帧之间的差异，当检测到远程主机画面不变时，停止传输视频流',
      resetHdmi: '重置 HDMI',
      webrtcConnectionFailed: {
        title: 'WebRTC 连接失败'
      },
      captureStatus: {
        hdmiError: 'HDMI 画面异常',
        unsupportedResolution: '当前分辨率不支持',
        retrieving: '正在获取画面...',
        changingResolution: '正在切换分辨率...',
        updateFailed: '画面暂时无法更新',
        videoError: '视频显示异常',
        noHdmi: '未检测到 HDMI 信号',
        unavailable: '画面暂时无法显示'
      }
    },
    keyboard: {
      title: '键盘',
      paste: '粘贴',
      tips: '仅支持标准键盘的字母和符号',
      placeholder: '请输入内容',
      submit: '确定',
      virtual: '虚拟键盘',
      readClipboard: '从剪贴板读取',
      clipboardPermissionDenied: '剪贴板权限被拒绝。请允许您的浏览器访问剪贴板。',
      clipboardReadError: '无法读取剪贴板',
      dropdownEnglish: '英语',
      dropdownGerman: '德语',
      dropdownFrench: '法语',
      dropdownRussian: '俄语',
      shortcut: {
        title: '快捷键',
        custom: '自定义',
        capture: '点击此处捕获快捷键',
        clear: '清空',
        save: '保存'
      },
      leaderKey: {
        title: '引导键',
        howToUse: '使用方法',
        simultaneous: {
          title: '组合按键模式',
          desc1: '按住引导键不放，同时按下目标快捷键。',
          desc2: '操作直观，但少数快捷键可能因系统占用而无法生效。'
        },
        sequential: {
          title: '序列输入模式',
          desc1: '点击引导键开始 → 依次点击快捷键 → 再次点击引导键结束。',
          desc2: '步骤较多，但能完美避开系统键位冲突。'
        },
        enable: '启用引导键',
        tip: '设为引导键后，该按键将仅用于触发快捷键，不再作为普通按键使用。',
        placeholder: '请按下引导键',
        shiftRight: '右 Shift',
        ctrlRight: '右 Ctrl',
        metaRight: '右 Win',
        submit: '确定',
        recorder: {
          rec: '录制中',
          activate: '激活按键',
          input: '请按下快捷键...'
        }
      }
    },
    mouse: {
      title: '鼠标',
      cursor: '光标样式',
      default: '默认光标',
      cell: '单元指针',
      text: '文本指针',
      grab: '抓取指针',
      hide: '隐藏指针',
      mode: '鼠标模式',
      absolute: '绝对模式',
      relative: '相对模式',
      direction: '滚轮方向',
      scrollUp: '向上',
      scrollDown: '向下',
      speed: '滚轮速度',
      fast: '快',
      slow: '慢',
      requestPointer: '正在使用鼠标相对模式，请点击桌面获取鼠标指针。',
      resetHid: '重置 HID',
      hidOnly: {
        title: 'HID-Only 模式',
        tip1: '启用 HID-Only 模式会卸载虚拟 U 盘和虚拟网络',
        tip2: 'HID-Only 模式下，镜像挂载将被禁用',
        tip3: '切换模式后将自动重启 NanoKVM',
        enable: '启用 HID-Only 模式',
        disable: '关闭 HID-Only 模式'
      }
    },
    image: {
      title: '镜像',
      empty: '无镜像文件',
      mountMode: '挂载模式',
      mountFailed: '挂载失败',
      diskOnWarn: '挂载镜像会关闭虚拟磁盘，电脑将无法再访问 /data 目录。是否继续？',
      diskOffWarn:
        '虚拟磁盘当前已关闭，需要先开启才能挂载镜像，电脑上的 USB 设备会短暂断开重连。是否继续？',
      unmountFailed: '卸载失败',
      forceEject: '强制弹出',
      forceEjectConfirm:
        '主机已锁定光驱。强制弹出会使虚拟 USB 设备短暂断开，键盘和鼠标可能会暂时断开连接。是否继续？',
      attention: '注意',
      deleteConfirm: '确定要删除该镜像吗？',
      tips: {
        title: '如何上传',
        usb3: '在电脑上打开虚拟硬盘，将镜像文件拷贝到虚拟硬盘的根目录下。',
        scp2: '在电脑上打开终端软件，使用 SCP 命令将镜像文件上传到 NanoKVM 的 /data 目录。',
        scp3: '示例：scp your-image-path root@your-nanokvm-ip:/data',
        tfCard: 'TF 卡',
        tf1: '该方式适用于 Linux 系统',
        tf4: '从电脑上拷贝镜像文件到 TF 卡的 /data 目录下；',
        tf5: '将 TF 卡重新插入 NanoKVM。'
      }
    },
    script: {
      title: '脚本',
      upload: '上传',
      run: '运行',
      runBackground: '后台运行',
      runFailed: '运行失败',
      delDesc: '确定要删除该文件吗？',
      delete: '删除',
      close: '关闭'
    },
    terminal: {
      title: '终端',
      nanokvm: 'NanoKVM 终端',
      serial: '串口终端',
      serialPort: '串口',
      serialPortPlaceholder: '请输入串口',
      baudrate: '波特率',
      parity: '奇偶校验',
      parityNone: '无',
      parityEven: '偶校验',
      parityOdd: '奇校验',
      flowControl: '流量控制',
      flowControlNone: '无',
      flowControlSoft: '软件',
      flowControlHard: '硬件',
      dataBits: '数据位',
      stopBits: '停止位',
      confirm: '确定'
    },
    wol: {
      title: 'Wake-on-LAN',
      sending: '指令发送中...',
      sent: '指令已发送',
      input: '请输入MAC地址',
      ok: '确定'
    },
    download: {
      title: '下载镜像',
      input: '请输入远程镜像 URL',
      ok: '确定',
      diskShared: '请先关闭虚拟磁盘功能，再使用镜像下载功能',
      mountedImage: '此镜像已挂载。上传同名文件前请先卸载。',
      diskOff: '关闭虚拟磁盘功能',
      uploadbox: '将文件拖放到此处或单击选择',
      NoISO: '无 ISO',
      sha256Placeholder: '请输入 64 位 SHA-256 校验和',
      invalidSHA256: 'SHA-256 必须是 64 位十六进制字符串',
      checksumFailed: '下载失败：SHA-256 校验失败'
    },
    power: {
      title: '电源',
      showConfirm: '显示确认框',
      showConfirmTip: '电源操作需要二次确认',
      reset: '重启',
      resetConfirm: '确认执行重启操作吗？',
      powerConfirm: '确认执行电源操作吗？',
      okBtn: '确认',
      cancelBtn: '取消'
    },
    settings: {
      title: '设置',
      about: {
        title: '关于 NanoKVM',
        information: '信息',
        ip: 'IP',
        mdns: 'mDNS',
        application: '应用版本',
        applicationTip: 'NanoKVM 网页应用版本',
        image: '镜像版本',
        imageTip: 'NanoKVM 系统镜像版本',
        uptime: '运行时间',
        community: '社区',
        hostname: '主机名',
        hostnameUpdated: '主机名修改成功，重启后生效',
        ipType: {}
      },
      appearance: {
        title: '外观',
        display: '显示',
        language: '语言',
        languageDesc: '选择界面语言',
        webTitle: '网页标题',
        webTitleDesc: '自定义网站页面标题',
        menuBar: {
          title: '菜单栏',
          mode: '显示方式',
          modeDesc: '菜单栏在屏幕上的显示方式',
          modeOff: '关闭',
          modeAuto: '自动隐藏',
          modeAlways: '始终显示',
          keyboardLedStatus: '键盘锁定状态指示灯',
          keyboardLedStatusDesc: '显示远程主机的 Num Lock、Caps Lock 和 Scroll Lock 状态',
          icons: '菜单图标',
          iconsDesc: '是否在菜单栏中显示子菜单图标'
        }
      },
      keyboardLedStatus: {
        groupLabel: '远程键盘锁定状态',
        indicatorLabel: '{{label}}：{{state}}',
        numLock: '数字锁定',
        numLockShort: '数',
        capsLock: '大写锁定',
        capsLockShort: '大',
        scrollLock: '滚动锁定',
        scrollLockShort: '滚',
        on: '开启',
        off: '关闭',
        unknown: '未知'
      },
      device: {
        title: '设备',
        oled: {
          title: 'OLED',
          description: '设置 OLED 屏幕自动休眠时间'
        },
        ssh: {
          description: '启用 SSH 远程访问'
        },
        swap: {
          title: '交换',
          description: '设置交换文件大小'
        },
        mouseJiggler: {
          title: '鼠标抖动',
          description: '防止远程主机休眠',
          disable: '关闭',
          absolute: '绝对模式',
          relative: '相对模式'
        },
        sessionLock: {
          title: '无操作后锁定会话',
          description: '超过该时间无操作后需要重新登录'
        },
        mdns: {
          description: '启用 mDNS 发现服务',
          tip: '如果您未使用此功能，建议将其关闭'
        },
        hdmi: {
          description: '启用 HDMI/显示器 输出功能',
          idleTimeoutTitle: '无观看者自动停止采集',
          idleTimeoutDescription: '没有活跃观看者后停止 HDMI 采集，0 表示永不停止'
        },
        hidOnly: 'HID-Only 模式',
        disk: '虚拟磁盘',
        network: '虚拟网卡',
        networkDesc: '在远程主机中挂载虚拟网卡',
        reboot: '重新启动',
        rebootDesc: '您确定要重新启动 NanoKVM 吗？'
      },
      network: {
        title: '网络',
        wifi: {
          title: 'Wi-Fi',
          description: '配置 Wi-Fi 信息',
          apMode: 'AP 模式已启用，请扫描二维码连接 Wi-Fi',
          connect: '连接 Wi-Fi',
          connectDesc1: '请输入网络名称和密码',
          disconnect: '是否要断开该网络连接？',
          ssid: '名称',
          password: '密码',
          joinBtn: '加入',
          cancelBtn: '取消'
        },
        tls: {
          description: '启用 HTTPS 协议'
        },
        dns: {
          title: 'DNS',
          description: '配置 NanoKVM 使用的 DNS 服务器',
          ipv4Title: 'IPv4',
          ipv4Description: '配置有线接口的 IPv4 地址',
          dhcp: 'DHCP',
          manual: '手动',
          apply: '应用',
          invalid: '请输入有效的 IPv4 或 IPv6 地址',
          invalidNetwork: '请输入有效的 IPv4 地址、子网掩码和路由器',
          saved: 'DNS 设置已保存',
          redirecting: '网络设置已保存。正在打开新地址...',
          saveFailed: '保存 DNS 设置失败',
          unsaved: '有未保存的更改',
          maxServers: '最多允许 {{count}} 个 DNS 服务器',
          dhcpServersDescription: 'DNS 服务器由 DHCP 自动获取',
          interface: '接口',
          ipAddress: 'IP 地址',
          subnetMask: '子网掩码',
          router: '路由器'
        }
      },
      tailscale: {
        title: 'Tailscale',
        memory: {
          title: '内存优化',
          tip: '当内存占用超过限制时，会更积极地执行垃圾回收来尝试释放内存。需重启 Tailscale 后生效。'
        },
        swap: {
          title: '交换内存',
          tip: '如果启用内存优化后依然存在问题，可以尝试开启交换内存。启用后会将交换文件设置为256MB，可以在「设置 - 设备」中修改该选项。'
        },
        stop: '确定要停止 Tailscale 吗？',
        loading: '加载中...',
        install: '安装',
        installing: '安装中',
        failed: '安装失败',
        download: '下载',
        package: '安装包',
        unzip: '并解压',
        upTailscale: '将 tailscale 上传到 NanoKVM 的 /usr/bin/ 目录',
        upTailscaled: '将 tailscaled 上传到 NanoKVM 的 /usr/sbin/ 目录',
        refresh: '刷新页面',
        notRunning: 'Tailscale 尚未运行，请先执行启动操作',
        run: '启动',
        notLogin: '该设备尚未绑定，请点击登录并将这台设备绑定到您的账号。',
        urlPeriod: '该链接10分钟内有效',
        login: '登录',
        loginSuccess: '登录完成',
        deviceName: '设备名称',
        deviceIP: '设备地址',
        account: '账号',
        logout: '退出',
        logoutDesc: '确定要退出吗？',
        uninstall: '卸载 Tailscale',
        uninstallDesc: '确定要卸载 Tailscale 吗？',
        okBtn: '确认',
        cancelBtn: '取消'
      },
      update: {
        title: '检查更新',
        queryFailed: '获取版本号失败',
        updateFailed: '更新失败，请重试',
        isLatest: '已经是最新版本。',
        available: '有新的可用版本，确定要更新吗？',
        updating: '更新中，请稍候...',
        confirm: '确定',
        cancel: '取消',
        preview: '预览更新',
        offline: {
          title: '离线更新',
          desc: '通过本地安装包进行更新',
          upload: '上传',
          invalidName: '文件名格式错误，请前往 GitHub 发布页下载安装包。',
          updateFailed: '更新失败，请重试'
        }
      },
      account: {
        title: '帐号',
        webAccount: '网页帐号',
        password: '密码',
        updateBtn: '修改',
        logoutBtn: '退出',
        logoutDesc: '确定要退出吗？',
        okBtn: '确定',
        cancelBtn: '取消'
      }
    },
    picoclaw: {
      title: 'PicoClaw 助手',
      newConversation: '新对话',
      processing: '正在处理中...',
      agent: {
        defaultTitle: '通用助手',
        kvmTitle: '远程控制',
        switched: '角色已切换',
        switchFailed: '切换角色失败'
      },
      send: '发送',
      cancel: '取消',
      status: {
        connecting: '正在连接 Gateway...',
        connected: 'PicoClaw 会话已连接',
        disconnected: 'PicoClaw 会话已关闭',
        stopped: '已发送停止请求',
        runtimeStarted: 'PicoClaw 运行时已启动',
        runtimeStartFailed: '启动 PicoClaw 运行时失败',
        runtimeStopped: 'PicoClaw 运行时已停止',
        runtimeStopFailed: '停止 PicoClaw 运行时失败'
      },
      connection: {
        runtime: {
          checking: '检查中',
          ready: '运行时已就绪',
          stopped: '运行时未启动',
          unavailable: '运行时不可用',
          configError: '配置错误'
        },
        transport: {
          connecting: '连接中',
          connected: '已连接'
        },
        run: {
          idle: '空闲',
          busy: '执行中'
        }
      },
      message: {
        toolAction: '动作',
        observation: '观察',
        screenshot: '截图'
      },
      overlay: {
        locked: 'PicoClaw 正在控制设备，手动输入已暂停。'
      },
      install: {
        install: '安装 PicoClaw',
        installing: '正在安装 PicoClaw',
        success: 'PicoClaw 安装成功',
        failed: 'PicoClaw 安装失败',
        uninstalling: '正在卸载运行时...',
        requiredTitle: '未安装 PicoClaw',
        requiredDescription: '在启动 PicoClaw 运行时之前，需要先下载安装 PicoClaw。',
        progressDescription: '正在下载并安装 PicoClaw。',
        stages: {
          preparing: '准备中',
          downloading: '下载中',
          extracting: '解压中',
          verifying: '验证中',
          installing: '安装中',
          installed: '已安装',
          install_timeout: '已超时',
          install_failed: '失败'
        }
      },
      model: {
        requiredTitle: '需要配置模型',
        requiredDescription: '在使用 PicoClaw 聊天之前，请先配置 PicoClaw 模型。',
        docsTitle: '配置指南',
        docsDesc: '支持的模型与协议',
        menuLabel: '配置模型',
        modelIdentifier: '模型标识',
        modelIdentifierPlaceholder: 'openai/gpt-5.4',
        apiBase: 'API Base URL',
        apiBasePlaceholder: 'https://api.example.com/v1',
        apiKey: 'API Key',
        apiKeyPlaceholder: '请输入模型 API Key',
        save: '保存模型配置',
        saving: '正在保存模型配置',
        saved: '模型配置已保存',
        saveFailed: '保存模型配置失败',
        invalid: '模型标识、API Base URL 和 API Key 不能为空'
      },
      uninstall: {
        menuLabel: '卸载',
        confirmTitle: '卸载 PicoClaw',
        confirmContent: '确定要卸载 PicoClaw 吗？这会删除可执行文件和所有配置文件。',
        confirmOk: '卸载'
      },
      history: {
        title: '历史会话',
        loading: '正在加载历史会话...',
        emptyTitle: '还没有历史会话',
        emptyDescription: '之前的 PicoClaw 会话会显示在这里。',
        loadFailed: '加载会话历史失败',
        deleteFailed: '删除会话失败',
        deleteConfirmTitle: '删除会话',
        deleteConfirmContent: '确定要删除“{{title}}”吗？',
        deleteConfirmOk: '删除',
        messageCount_one: '{{count}} 条消息',
        messageCount_other: '{{count}} 条消息'
      },
      config: {
        startRuntime: '启动 PicoClaw',
        stopRuntime: '停止 PicoClaw'
      },
      start: {
        title: '启动 PicoClaw',
        description: '启动运行时后即可开始使用 PicoClaw 助手。'
      }
    },
    error: {
      title: '我们遇到了问题',
      refresh: '刷新'
    },
    fullscreen: {
      toggle: '切换全屏'
    },
    menu: {
      collapse: '收起'
    }
  }
};

export default zh;
