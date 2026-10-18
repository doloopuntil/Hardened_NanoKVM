const ja = {
  translation: {
    common: {
      confirm: '確認',
      cancel: 'キャンセル',
      delete: '削除',
      actionFailed: '操作に失敗しました',
      loading: 'デバイスから設定を読み込んでいます...',
      loadFailed: 'デバイスから設定を読み込めませんでした',
      retry: '再試行'
    },
    head: {
      desktop: 'リモートデスクトップ',
      login: 'ログイン',
      changePassword: 'パスワード変更',
      terminal: 'ターミナル',
      wifi: 'Wi-Fi'
    },
    auth: {
      login: 'ログイン',
      placeholderUsername: 'ユーザー名を入力してください',
      placeholderPassword: 'パスワードを入力してください',
      placeholderPassword2: 'パスワードをもう一度入力してください',
      noEmptyUsername: 'ユーザー名は空にできません',
      noEmptyPassword: 'パスワードは空にできません',
      invalidUser: 'ユーザー名またはパスワードが正しくありません',
      error: '不明なエラー',
      changePassword: 'パスワード変更',
      differentPassword: 'パスワードが一致しません',
      illegalUsername: 'ユーザー名に不正な文字が含まれています',
      forgetPassword: 'パスワードを忘れた',
      ok: 'OK',
      cancel: 'キャンセル',
      loginButtonText: 'ログイン',
      tips: {
        change1: 'この操作により、以下のパスワードも更新されることに注意してください：',
        change2: 'ウェブログインパスワード'
      }
    },
    wifi: {
      title: 'Wi-Fi',
      description: 'NanoKVM の Wi-Fi を設定する',
      invalidMode:
        '現在のモードではネットワーク設定はサポートされていません。デバイスで Wi-Fi 設定モードを有効にしてください。',
      confirmBtn: 'OK',
      finishBtn: '完了',
      ap: {
        authTitle: '認証が必要です',
        authDescription: '続行するには、AP パスワードを入力してください',
        authFailed: '無効な AP パスワード',
        passPlaceholder: 'AP パスワード',
        verifyBtn: '確認する'
      }
    },
    screen: {
      scale: '倍率',
      title: '画面',
      video: 'ビデオモード',
      resolution: '解像度',
      auto: '自動',
      autoTips:
        '特定の解像度で画面のちらつきやマウスカーソルのずれが発生する場合があります。リモートホストの解像度を調整するか、自動モードを無効にしてください。',
      fps: 'フレームレート',
      customizeFps: 'カスタマイズ',
      quality: '画質',
      qualityLossless: 'ロスレス',
      qualityHigh: '高',
      qualityMedium: '中',
      qualityLow: '低',
      frameDetect: 'フレーム差分検出',
      frameDetectTip:
        'フレーム間の差異を計算し、リモートホストの画面が変更されない場合はビデオストリームの送信を停止します',
      resetHdmi: 'HDMI をリセット',
      webrtcConnectionFailed: {
        title: 'WebRTC 接続に失敗しました'
      },
      captureStatus: {
        hdmiError: 'HDMI 画面エラー',
        unsupportedResolution: '現在の解像度はサポートされていません',
        retrieving: '画面を取得中...',
        changingResolution: '解像度を切り替え中...',
        updateFailed: '現在、画面を更新できません',
        videoError: '映像表示エラー',
        noHdmi: 'HDMI 信号が検出されません',
        unavailable: '現在、画面を表示できません'
      }
    },
    keyboard: {
      title: 'キーボード',
      paste: '貼り付け',
      tips: '標準的なキーボードの文字と記号のみをサポートしています',
      placeholder: '入力してください',
      virtual: '仮想キーボード',
      readClipboard: 'クリップボードから読み取る',
      clipboardPermissionDenied:
        'クリップボードのアクセス許可が拒否されました。ブラウザでクリップボードへのアクセスを許可してください。',
      clipboardReadError: 'クリップボードの読み取りに失敗しました',
      dropdownEnglish: '英語',
      dropdownGerman: 'ドイツ語',
      dropdownFrench: 'フランス語',
      dropdownRussian: 'ロシア語',
      shortcut: {
        title: 'ショートカット',
        custom: 'カスタム',
        capture: 'ショートカットをキャプチャするにはここをクリックしてください',
        clear: 'クリア',
        save: '保存'
      },
      leaderKey: {
        title: 'リーダーキー',
        howToUse: '使用方法',
        simultaneous: {
          title: '同時モード',
          desc1: 'リーダーキーを押したまま、ショートカットを押します。',
          desc2:
            '操作は直感的ですが、システムの使用状況により一部のショートカットキーが機能しない場合があります。'
        },
        sequential: {
          title: 'シーケンシャルモード',
          desc1: 'リーダーキーを押す → ショートカットを順番に押す → リーダーキーをもう一度押す。',
          desc2: 'いくつかの手順が必要ですが、システムキーの競合を完全に回避します。'
        },
        enable: 'リーダーキーを有効化',
        tip: 'リーダーキーに設定すると、このキーはショートカットのトリガー専用になり、通常の動作は失われます。',
        placeholder: 'リーダーキーを押してください',
        shiftRight: '右 Shift',
        ctrlRight: '右 Ctrl',
        metaRight: '右 Win',
        recorder: {
          rec: 'REC',
          activate: 'キーを有効化',
          input: 'ショートカットキーを押してください...'
        }
      }
    },
    mouse: {
      title: 'マウス',
      cursor: 'ポインター形状',
      default: 'デフォルトポインター',
      cell: 'セルポインター',
      text: 'テキストカーソル',
      grab: 'つかむポインター',
      hide: 'ポインターを非表示',
      mode: 'マウスモード',
      absolute: '絶対モード',
      relative: '相対モード',
      direction: 'ホイール方向',
      scrollUp: '上',
      scrollDown: '下',
      speed: 'ホイール速度',
      fast: '速い',
      slow: '遅い',
      requestPointer:
        '相対モードを使用中です。マウスポインターを取得するには、デスクトップをクリックしてください。',
      resetHid: 'HID をリセット',
      hidOnly: {
        title: 'HID-Only モード',
        tip1: 'HID-Only モードを有効にすると、仮想 U ディスクと仮想ネットワークがアンマウントされます',
        tip2: 'HID-Only モードでは、イメージのマウントは無効になります',
        enable: 'HID-Only モードを有効化',
        disable: 'HID-Only モードを無効化'
      }
    },
    image: {
      title: 'イメージ',
      empty: 'イメージファイルがありません',
      mountMode: 'マウントモード',
      mountFailed: 'マウントに失敗しました',
      diskOnWarn:
        'イメージをマウントすると仮想ディスクがオフになり、コンピュータから /data にアクセスできなくなります。続行しますか？',
      diskOffWarn:
        '仮想ディスクがオフになっているため、イメージのマウントには有効化が必要です。コンピュータの USB デバイスが再接続されます。続行しますか？',
      unmountFailed: 'アンマウントに失敗しました',
      forceEject: '強制的に取り出す',
      forceEjectConfirm:
        'ホストが光学ドライブをロックしています。強制的に取り出すと、仮想 USB デバイスが一時的に切断されるため、キーボードとマウスも一時的に切断される場合があります。続行しますか？',
      deleteConfirm: 'このイメージを削除してもよろしいですか？',
      tips: {
        title: 'アップロード方法',
        usb1: 'NanoKVM を USB 経由でコンピュータに接続します；',
        usb3: 'コンピュータ上で仮想ディスクを開き、イメージファイルを仮想ディスクのルートディレクトリにコピーします。',
        scp1: 'NanoKVM とコンピュータが同じローカルエリアネットワークに接続されていることを確認します；',
        scp2: 'コンピュータでターミナルを開き、SCP コマンドを使用してイメージファイルを NanoKVM の /data ディレクトリにアップロードします。',
        scp3: '例：scp your-image-path root@your-nanokvm-ip:/data',
        tfCard: 'TF カード',
        tf1: 'この方法は Linux システムでサポートされています',
        tf3: 'TF カードをカードリーダーに挿入してコンピュータに接続します；',
        tf4: 'コンピューターから TF カードの /data ディレクトリにイメージファイルをコピーします；',
        tf5: 'TF カードを NanoKVM に挿入します。'
      }
    },
    script: {
      title: 'スクリプト',
      upload: 'アップロード',
      run: '実行',
      runBackground: 'バックグラウンドで実行',
      runFailed: '実行に失敗しました',
      delDesc: 'このファイルを削除してもよろしいですか？',
      delete: '削除',
      close: '閉じる'
    },
    terminal: {
      title: 'ターミナル',
      nanokvm: 'NanoKVM ターミナル',
      serial: 'シリアルポートターミナル',
      serialPort: 'シリアルポート',
      serialPortPlaceholder: 'シリアルポートを入力してください',
      baudrate: 'ボーレート',
      parity: 'パリティ',
      parityNone: 'なし',
      parityEven: '偶数',
      parityOdd: '奇数',
      flowControl: 'フロー制御',
      flowControlNone: 'なし',
      flowControlSoft: 'ソフトウェア',
      flowControlHard: 'ハードウェア',
      dataBits: 'データビット',
      stopBits: 'ストップビット'
    },
    wol: {
      title: 'Wake-on-LAN',
      sending: 'コマンドを送信中...',
      sent: 'コマンドを送信しました',
      input: 'MAC アドレスを入力してください',
      ok: 'OK'
    },
    download: {
      title: 'イメージダウンローダー',
      input: 'リモートイメージの URL を入力してください',
      ok: 'OK',
      mountedImage:
        'このイメージはマウントされています。同じ名前のファイルをアップロードする前にマウントを解除してください。',
      diskOff: '仮想ディスクをオフにする',
      uploadbox: 'ここにファイルをドロップするか、クリックして選択してください',
      NoISO: 'ISO なし',
      sha256Placeholder: '64 文字の SHA-256 チェックサムを入力してください',
      invalidSHA256: 'SHA-256 は 64 文字の 16 進数文字列である必要があります',
      checksumFailed: 'ダウンロードに失敗しました：SHA-256 検証に失敗しました'
    },
    power: {
      title: '電源',
      showConfirm: '確認メッセージ',
      showConfirmTip: '電源操作の確認メッセージを表示する',
      reset: 'リセット',
      resetConfirm: '再起動を実行しますか？',
      powerConfirm: '電源操作を実行しますか？',
      okBtn: 'はい',
      cancelBtn: 'いいえ'
    },
    settings: {
      title: '設定',
      about: {
        title: 'NanoKVM について',
        information: '情報',
        ip: 'IP',
        mdns: 'mDNS',
        application: 'アプリケーションバージョン',
        applicationTip: 'NanoKVM ウェブアプリケーションバージョン',
        community: 'コミュニティ',
        hostname: 'ホスト名',
        hostnameUpdated: 'ホスト名は正常に変更され、再起動後に有効になります',
        ipType: {}
      },
      appearance: {
        title: '外観',
        display: '表示',
        language: '言語',
        languageDesc: 'インターフェース言語の選択',
        webTitle: 'ウェブページタイトル',
        webTitleDesc: 'ウェブページタイトルのカスタマイズ',
        menuBar: {
          title: 'メニューバー',
          mode: '表示モード',
          modeDesc: 'メニューバーの画面表示方法',
          modeAuto: '自動非表示',
          modeAlways: '常に表示',
          keyboardLedStatus: 'キーボードロックの表示',
          keyboardLedStatusDesc:
            'リモートコンピューターの Num Lock、Caps Lock、Scroll Lock の状態を表示',
          icons: 'メニューアイコン',
          iconsDesc: 'メニューバーでのサブメニューアイコンの表示'
        }
      },
      keyboardLedStatus: {
        groupLabel: 'リモートキーボードのロック状態',
        indicatorLabel: '{{label}}：{{state}}',
        numLock: 'Num Lock',
        numLockShort: 'Num',
        capsLock: 'Caps Lock',
        capsLockShort: 'Caps',
        scrollLock: 'Scroll Lock',
        scrollLockShort: 'Scr',
        on: 'オン',
        off: 'オフ',
        unknown: '不明'
      },
      device: {
        title: 'デバイス',
        oled: {
          title: 'OLED',
          description: 'OLED 画面の自動スリープ時間'
        },
        ssh: {
          description: 'SSH リモートアクセスを有効にする'
        },
        swap: {
          title: 'スワップ',
          description: 'スワップファイルのサイズを設定する'
        },
        mouseJiggler: {
          title: 'マウスジグラー',
          description: 'リモートホストの休止を防ぐ',
          absolute: '絶対モード',
          relative: '相対モード'
        },
        mdns: {
          description: 'mDNS 検出サービスを有効にする',
          tip: 'この機能を使用していない場合は、オフにすることをお勧めします'
        },
        hdmi: {
          description: 'HDMI/モニター 出力機能を有効にする',
          idleTimeoutTitle: 'キャプチャのアイドルタイムアウト',
          idleTimeoutDescription:
            'アクティブな閲覧者がいない状態が次の時間続いたら HDMI キャプチャを停止'
        },
        hidOnly: 'HID-Only モード',
        disk: '仮想ディスク',
        network: '仮想ネットワークカード',
        networkDesc: 'リモートホストに仮想ネットワークカードをマウントする',
        reboot: '再起動',
        rebootDesc: 'NanoKVM を再起動してもよろしいですか?'
      },
      network: {
        title: 'ネットワーク',
        wifi: {
          title: 'Wi-Fi',
          description: 'Wi-Fi 設定',
          connect: 'Wi-Fi に接続',
          connectDesc1: 'SSID とパスワードを入力してください',
          disconnect: 'このネットワーク接続を切断しますか？',
          ssid: 'SSID',
          password: 'パスワード',
          joinBtn: '接続',
          cancelBtn: 'キャンセル'
        },
        tls: {
          description: 'HTTPS プロトコルを有効にする'
        },
        dns: {
          title: 'DNS',
          description: 'NanoKVM の DNS サーバーを設定',
          ipv4Title: 'IPv4',
          ipv4Description: '有線インターフェースの IPv4 アドレスを設定します',
          dhcp: 'DHCP',
          manual: '手動',
          apply: '適用',
          invalid: '有効な IPv4 または IPv6 アドレスを入力してください',
          invalidNetwork: '有効な IPv4 アドレス、サブネットマスク、ルーターを入力してください',
          saved: 'DNS 設定を保存しました',
          redirecting: 'ネットワーク設定を保存しました。新しいアドレスを開いています...',
          saveFailed: 'DNS 設定の保存に失敗しました',
          unsaved: '未保存の変更',
          maxServers: 'DNS サーバーは最大 {{count}} 個までです',
          dhcpServersDescription: 'DNS サーバーは DHCP から自動取得されます',
          interface: 'インターフェイス',
          ipAddress: 'IP アドレス',
          subnetMask: 'サブネットマスク',
          router: 'ルーター'
        }
      },
      tailscale: {
        title: 'Tailscale',
        memory: {
          title: 'メモリ最適化',
          tip: 'メモリ使用量が上限を超えると、メモリ解放のためにより積極的にガベージコレクションが実行されます。Tailscale を使用する場合は 50MB に設定することをお勧めします。この設定を有効にするには Tailscale を再起動する必要があります。'
        },
        swap: {
          title: 'スワップメモリ',
          tip: 'メモリ最適化を有効にしても問題が解決しない場合は、スワップメモリ​​を有効にしてみてください。有効にするとスワップファイルが 256MB に設定されます。このサイズは「設定 - デバイス」で変更できます。'
        },
        restart: 'Tailscale を再起動しますか？',
        stop: 'Tailscale を停止しますか？',
        loading: '読み込み中...',
        notInstall: 'Tailscale が見つかりません。インストールしてください。',
        install: 'インストール',
        installing: 'インストール中',
        failed: 'インストールに失敗しました',
        download: 'ダウンロードして',
        package: 'インストールパッケージを',
        unzip: '解凍してください',
        upTailscale: 'tailscale ファイルを NanoKVM の /usr/bin ディレクトリにアップロードします',
        upTailscaled: 'tailscaled ファイルを NanoKVM の /usr/sbin ディレクトリにアップロードします',
        refresh: 'ページを更新します',
        notRunning: 'Tailscale はまだ実行されていません。起動操作を実行してください',
        run: '起動',
        notLogin:
          'このデバイスはまだバインドされていません。ログインしてデバイスをアカウントにバインドしてください。',
        urlPeriod: 'この URL は 10 分間有効です',
        login: 'ログイン',
        loginSuccess: 'ログイン成功',
        deviceName: 'デバイス名',
        deviceIP: 'デバイスアドレス',
        account: 'アカウント',
        logout: 'ログアウト',
        logoutDesc: 'ログアウトしてもよろしいですか？',
        uninstall: 'Tailscale をアンインストール',
        uninstallDesc: 'Tailscale をアンインストールしてもよろしいですか？',
        okBtn: 'はい',
        cancelBtn: 'いいえ'
      },
      update: {
        title: 'アップデート',
        queryFailed: 'バージョン番号の取得に失敗しました',
        updateFailed: 'アップデートに失敗しました。もう一度お試しください。',
        isLatest: 'すでに最新バージョンです。',
        available: '新しいバージョンが利用可能です。アップデートしてもよろしいですか？',
        updating: 'アップデート中、お待ちください...',
        confirm: 'はい',
        cancel: 'いいえ',
        preview: 'プレビューアップデート',
        offline: {
          title: 'オフラインアップデート',
          desc: 'ローカルインストールパッケージでアップデートする',
          upload: 'アップロード',
          invalidName:
            'ファイル名の形式が正しくありません。GitHub リリースページにアクセスしてインストールパッケージをダウンロードしてください。',
          updateFailed: 'アップデートに失敗しました。もう一度お試しください。'
        }
      },
      account: {
        title: 'アカウント',
        webAccount: 'ウェブアカウント名',
        password: 'パスワード',
        updateBtn: '変更',
        logoutBtn: 'ログアウト',
        logoutDesc: 'ログアウトしてもよろしいですか？',
        okBtn: 'はい',
        cancelBtn: 'いいえ'
      }
    },
    picoclaw: {
      title: 'PicoClaw アシスタント',
      inputPlaceholder: 'PicoClaw に実行してほしいことを説明してください',
      newConversation: '新しい会話',
      processing: '処理中...',
      agent: {
        defaultTitle: '一般アシスタント',
        kvmTitle: 'リモート操作',
        switched: 'エージェントの役割が切り替わりました',
        switchFailed: 'エージェントの役割を切り替えることができませんでした'
      },
      send: '送信',
      cancel: 'キャンセル',
      status: {
        connecting: 'ゲートウェイに接続しています...',
        connected: 'PicoClaw セッションが接続されました',
        disconnected: 'PicoClaw セッションが終了しました',
        stopped: '停止要求が送信されました',
        runtimeStarted: 'PicoClaw ランタイムが開始されました',
        runtimeStartFailed: 'PicoClaw ランタイムの開始に失敗しました',
        runtimeStopped: 'PicoClaw ランタイムが停止しました',
        runtimeStopFailed: 'PicoClaw ランタイムの停止に失敗しました'
      },
      connection: {
        runtime: {
          checking: 'チェック中',
          ready: 'ランタイムの準備が完了しました',
          stopped: 'ランタイムが停止しました',
          unavailable: 'ランタイムが使用できません',
          configError: '構成エラー'
        },
        transport: {
          connecting: '接続中',
          connected: '接続されました'
        },
        run: {
          idle: 'アイドル状態'
        }
      },
      message: {
        toolAction: 'アクション',
        observation: '観察',
        screenshot: 'スクリーンショット'
      },
      overlay: {
        locked: 'PicoClaw がデバイスを制御しています。手動入力が一時停止されます。'
      },
      install: {
        install: 'PicoClaw をインストールする',
        installing: 'PicoClaw をインストールしています',
        success: 'PicoClaw は正常にインストールされました',
        failed: 'PicoClaw のインストールに失敗しました',
        uninstalling: 'ランタイムをアンインストールしています...',
        requiredTitle: 'PicoClaw がインストールされていません',
        requiredDescription:
          'PicoClaw ランタイムを開始する前に PicoClaw をインストールしてください。',
        progressDescription: 'PicoClaw をダウンロードしてインストールしています。',
        stages: {
          preparing: '準備中',
          downloading: 'ダウンロード中',
          extracting: '展開中',
          verifying: '検証中',
          installing: 'インストール中',
          installed: 'インストール完了',
          install_timeout: 'タイムアウト',
          install_failed: '失敗'
        }
      },
      model: {
        requiredTitle: 'モデル構成が必要です',
        requiredDescription: 'PicoClaw チャットを使用する前に、PicoClaw モデルを構成します。',
        docsTitle: '構成ガイド',
        docsDesc: 'サポートされているモデルとプロトコル',
        menuLabel: 'モデルの構成',
        modelIdentifier: 'モデル識別子',
        modelIdentifierPlaceholder: 'openai/gpt-5.4',
        apiBase: 'API Base URL',
        apiBasePlaceholder: 'https://api.example.com/v1',
        apiKey: 'API キー',
        apiKeyPlaceholder: 'モデルの API キーを入力してください',
        save: '保存',
        saving: '保存中',
        saved: 'モデル構成が保存されました',
        saveFailed: 'モデル構成の保存に失敗しました',
        invalid: 'モデル識別子、API Base URL、API キーは必須です'
      },
      uninstall: {
        menuLabel: 'アンインストール',
        confirmTitle: 'PicoClaw のアンインストール',
        confirmContent:
          'PicoClaw をアンインストールしてもよろしいですか?これにより、実行可能ファイルとすべての構成ファイルが削除されます。',
        confirmOk: 'アンインストール'
      },
      history: {
        title: '履歴',
        loading: 'セッションを読み込み中...',
        emptyTitle: '履歴はまだありません',
        emptyDescription: '以前の PicoClaw セッションがここに表示されます。',
        loadFailed: 'セッション履歴のロードに失敗しました',
        deleteFailed: 'セッションの削除に失敗しました',
        deleteConfirmTitle: 'セッションを削除します',
        deleteConfirmContent: '「{{title}}」を削除してもよろしいですか?',
        deleteConfirmOk: '削除',
        messageCount_one: '{{count}} メッセージ',
        messageCount_other: '{{count}} メッセージ'
      },
      config: {
        startRuntime: 'PicoClaw を開始',
        stopRuntime: 'PicoClaw を停止'
      },
      start: {
        title: 'PicoClaw を開始',
        description: 'ランタイムを起動して、PicoClaw アシスタントの使用を開始します。'
      }
    },
    error: {
      title: 'エラーが発生しました',
      refresh: '更新'
    },
    fullscreen: {
      toggle: '全画面表示切り替え'
    },
    menu: {
      collapse: 'メニューを折りたたむ'
    }
  }
};

export default ja;
