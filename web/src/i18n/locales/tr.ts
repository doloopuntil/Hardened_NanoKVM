const tr = {
  translation: {
    common: {
      confirm: 'Onayla',
      cancel: 'İptal',
      delete: 'Sil',
      actionFailed: 'İşlem başarısız oldu',
      loading: 'Ayarlar cihazdan yükleniyor...',
      loadFailed: 'Ayarlar cihazdan yüklenemedi',
      retry: 'Yeniden dene'
    },
    head: {
      desktop: 'Uzak masaüstü',
      login: 'Giriş',
      changePassword: 'Şifreyi değiştir',
      terminal: 'Uçbirim',
      wifi: 'Wi-Fi'
    },
    auth: {
      login: 'Giriş',
      placeholderUsername: 'Kullanıcı Adı',
      placeholderPassword: 'Şifre',
      noEmptyUsername: 'Kullanıcı adı gereklidir',
      noEmptyPassword: 'Şifre gereklidir',
      invalidUser: 'Yanlış kullanıcı adı ya da şifre',
      locked: 'Çok fazla giriş yapıldı, lütfen daha sonra tekrar deneyin',
      globalLocked: 'Sistem koruma altında, lütfen daha sonra tekrar deneyin',
      error: 'Beklenmedik bir hata',
      changePassword: 'Şifrenizi değiştiriniz',
      differentPassword: 'Şifreler eşleşmemektedir',
      illegalUsername: 'Kullanıcı adı istenmeyen karakterler içermektedir',
      forgetPassword: 'Şifremi unuttum',
      ok: 'Tamam',
      cancel: 'İptal',
      loginButtonText: 'Giriş',
      tips: {
        change1: 'Bu işlem şu şifreleri değiştiricektir:',
        change2: 'Arayüz giriş şifresi'
      }
    },
    wifi: {
      title: 'Wi-Fi',
      description: 'NanoKVM için Wi-Fi ayarlarını ayarlayın',
      invalidMode:
        'Geçerli mod ağ kurulumunu desteklemiyor. Lütfen cihazınıza gidin ve Wi-Fi yapılandırma modunu etkinleştirin.',
      confirmBtn: 'Tamam',
      finishBtn: 'Bitti',
      ap: {
        authTitle: 'Kimlik Doğrulaması Gerekli',
        authDescription: 'Devam etmek için lütfen AP şifresini girin',
        authFailed: 'Geçersiz AP şifresi',
        passPlaceholder: 'AP şifre',
        verifyBtn: 'Doğrula'
      }
    },
    screen: {
      scale: 'Ölçek',
      title: 'Ekran',
      video: 'Görüntü modu',
      resolution: 'Çözünürlük',
      auto: 'Otomatik',
      autoTips:
        'Belirli çözünürlüklerde ekran yırtılması veya fare kayması meydana gelebilir. Bu durumda uzak ana bilgisayarın çözünürlüğünü ayarlamayı ya da otomatik modu devre dışı bırakmayı deneyin.',
      fps: 'Saniyedeki kare sayısı',
      customizeFps: 'Kişiselleştir',
      quality: 'Kalite',
      qualityLossless: 'Kayıpsız',
      qualityHigh: 'Yüksek',
      qualityMedium: 'Orta',
      qualityLow: 'Düşük',
      frameDetect: 'Kareleri algıla',
      frameDetectTip:
        'Gönderilen kareler arasındaki farkı hesaplar. Uzak ana bilgisayardan gönderilen yayında bir değişiklik yoksa görüntü yayınını durdurur.',
      resetHdmi: 'HDMI sıfırla',
      webrtcConnectionFailed: {
        title: 'WebRTC bağlantısı başarısız'
      },
      captureStatus: {
        hdmiError: 'HDMI ekran hatası',
        unsupportedResolution: 'Geçerli çözünürlük desteklenmiyor',
        retrieving: 'Ekran alınıyor...',
        changingResolution: 'Çözünürlük değiştiriliyor...',
        updateFailed: 'Ekran şu anda güncellenemiyor',
        videoError: 'Video görüntüleme hatası',
        noHdmi: 'HDMI sinyali algılanmadı',
        unavailable: 'Ekran şu anda gösterilemiyor'
      }
    },
    keyboard: {
      title: 'Klavye',
      paste: 'Yapıştır',
      placeholder: 'Girdi',
      submit: 'Gönder',
      virtual: 'Klavye',
      readClipboard: 'Panodan Oku',
      clipboardPermissionDenied:
        'Pano izni reddedildi. Lütfen tarayıcınızda pano erişimine izin verin.',
      clipboardReadError: 'Pano okunamadı',
      dropdownEnglish: 'İngilizce',
      dropdownGerman: 'Almanca',
      dropdownFrench: 'Fransızca',
      dropdownRussian: 'Rusça',
      shortcut: {
        title: 'Kısayollar',
        custom: 'Özel',
        capture: 'Kısayolu yakalamak için burayı tıklayın',
        clear: 'Temizle',
        save: 'Kaydet'
      },
      leaderKey: {
        title: 'Leader Tuşu',
        howToUse: 'Nasıl Kullanılır',
        simultaneous: {
          title: 'Eşzamanlı Mod',
          desc1: 'Leader tuşunu basılı tutun, ardından kısayola basın.',
          desc2: 'Sezgisel, ancak sistem kısayollarıyla çakışabilir.'
        },
        sequential: {
          title: 'Sıralı Mod',
          desc1: 'Leader tuşuna basın → kısayola sırayla basın → Leader tuşuna tekrar basın.',
          desc2: 'Daha fazla adım gerektirir ancak sistem çakışmalarını tamamen önler.'
        },
        enable: 'Leader tuşunu etkinleştir',
        tip: 'Leader tuşu olarak atandığında bu tuş yalnızca kısayol tetikleyici olarak çalışır ve varsayılan davranışını kaybeder.',
        placeholder: 'Leader tuşuna basın',
        shiftRight: 'Sağ Shift',
        ctrlRight: 'Sağ Ctrl',
        metaRight: 'Sağ Win',
        submit: 'Gönder',
        recorder: {
          rec: 'KAYIT',
          activate: 'Tuşları etkinleştir',
          input: 'Lütfen kısayola basın...'
        }
      }
    },
    mouse: {
      title: 'Fare',
      cursor: 'İmleç sitili',
      default: 'Varsayılan imleç',
      cell: 'Artı imleç',
      text: 'Yazı imleç',
      grab: 'El imleç',
      hide: 'İmleci gizle',
      mode: 'Fare modu',
      absolute: 'Mutlak fare modu',
      relative: 'Bağıl fare modu',
      direction: 'Kaydırma tekerleği yönü',
      scrollUp: 'Yukarı kaydır',
      scrollDown: 'Aşağı kaydır',
      speed: 'Kaydırma tekerleği hızı',
      fast: 'Hızlı',
      slow: 'Yavaş',
      requestPointer: 'Bağıl fare modu kullanılıyor. Masaüstüne tıklayarak imleç elde edinin.',
      resetHid: 'HID’yi sıfırla',
      hidOnly: {
        title: 'Yalnızca HID modu',
        tip1: 'Yalnızca HID modunu etkinleştirmek sanal U-disk’i ve sanal ağı ayırır',
        tip2: 'Yalnızca HID modunda imaj bağlama devre dışıdır',
        tip3: 'NanoKVM mod değişiminden sonra kendiliğinden yeniden başlatılacaktır',
        enable: 'Yalnızca HID modunu etkinleştir',
        disable: 'Yalnızca HID modunu devre dışı bırak'
      }
    },
    image: {
      title: 'Disk İmajları',
      loading: 'Yükleniyor...',
      empty: 'Hiçbir şey bulunamadı',
      mountMode: 'Montaj modu',
      diskOnWarn:
        'İmajı bağlamak sanal diski kapatır, böylece bilgisayar /data dizinine erişemez. Devam edilsin mi?',
      diskOffWarn:
        'Sanal disk kapalı ve imajı bağlamak için açılması gerekiyor. Bilgisayardaki USB aygıtları yeniden tanımlanır. Devam edilsin mi?',
      forceEject: 'Çıkarmayı zorla',
      forceEjectConfirm:
        'Ana bilgisayar optik sürücüyü kilitledi. Çıkarmayı zorlamak, sanal USB aygıtının bağlantısını kısa süreliğine keser; bu nedenle klavye ve fare kısa süreliğine bağlantıyı kaybedebilir. Devam edilsin mi?',
      attention: 'Dikkat',
      deleteConfirm: 'Bu resmi silmek istediğinizden emin misiniz?',
      tips: {
        title: 'Nasıl yüklenir',
        usb1: "NanoKVM'i bilgisayarınıza USB ile bağlayın.",
        usb3: 'Sanal diski bilgisayarınızda açın ve disk imajı dosyanızı sanal diskin kök dizinine kopyalayın.',
        scp1: 'NanoKVM ve bilgisayarınızın aynı yerel ağda bulunduğundan emin olun.',
        tfCard: 'micro SD kart',
        tf3: 'micro SD kartı kart okuyucusuna takın ve bilgisayarınıza bağlayın.',
        tf5: "micro SD kartı NanoKVM'e geri yerleştirin."
      }
    },
    script: {
      title: 'Betikler',
      upload: 'Yükle',
      run: 'Çalıştır',
      runBackground: 'Arka planda çalıştır',
      runFailed: 'Çalıştırma başarısız oldu',
      delete: 'Sil',
      close: 'Kapat'
    },
    terminal: {
      title: 'Uçbirim',
      nanokvm: 'NanoKVM Uçbirimi',
      serial: 'Serial Port Uçbirimi',
      serialPort: 'Seri port',
      serialPortPlaceholder: 'Lütfen serial portunu giriniz',
      baudrate: 'Baud hızı',
      parity: 'Eşlik kontrolü',
      parityNone: 'Yok',
      parityEven: 'Çift',
      parityOdd: 'Tek',
      flowControl: 'Akış kontrolü',
      flowControlNone: 'Yok',
      flowControlSoft: 'Yazılımsal',
      flowControlHard: 'Donanımsal',
      dataBits: 'Veri bitleri',
      stopBits: 'Dur bitleri',
      confirm: 'Tamam'
    },
    wol: {
      sending: 'Komut gönderiliyor...',
      sent: 'Komut gönderildi',
      input: 'MAC adresi girin',
      ok: 'Tamam'
    },
    download: {
      title: 'Disk İmajı İndirici',
      input: 'Uzak imaj URL’sini girin',
      ok: 'Tamam',
      mountedImage: 'Bu imaj bağlı. Aynı adlı bir dosyayı yüklemeden önce bağlantısını kesin.',
      diskOff: 'Sanal diski kapat',
      uploadbox: 'Dosyayı buraya bırakın veya seçmek için tıklayın',
      inputfile: 'Lütfen resim dosyasını giriniz',
      NoISO: 'ISO yok',
      sha256Placeholder: '64 karakterlik SHA-256 sağlama toplamını girin',
      invalidSHA256: 'SHA-256, 64 karakterlik bir onaltılık dize olmalıdır',
      checksumFailed: 'İndirme başarısız: SHA-256 doğrulaması başarısız'
    },
    power: {
      title: 'Güç',
      showConfirm: 'Doğrulama',
      showConfirmTip: 'Güç ile ilgili işlemler fazladan doğrulama gerektirir',
      reset: 'Sıfırla',
      resetConfirm: 'Sıfırlama işlemine devam etmek istediğinizden emin misiniz?',
      powerConfirm: 'Güç işlemine devam etmek istediğinizden emin misiniz?',
      okBtn: 'Evet',
      cancelBtn: 'Hayır'
    },
    settings: {
      title: 'Ayarlar',
      about: {
        title: 'NanoKVM Hakkında',
        information: 'Bilgi',
        ip: 'IP',
        mdns: 'mDNS',
        application: 'Uygulama sürümü',
        applicationTip: 'NanoKVM web uygulaması sürümü',
        image: 'İmaj Sürümü',
        imageTip: 'NanoKVM sistem imajı sürümü',
        community: 'Topluluk',
        hostname: 'Ana makine adı',
        hostnameUpdated: 'Hostname güncellendi. Uygulamak için yeniden başlatın.',
        ipType: {}
      },
      appearance: {
        title: 'Görünüm',
        display: 'Ekran',
        language: 'Dil',
        languageDesc: 'Arayüz için dili seçin',
        webTitle: 'Site başlığı',
        webTitleDesc: 'Görünen site başlığını güncelleyin',
        menuBar: {
          title: 'Menü Çubuğu',
          mode: 'Görüntüleme Modu',
          modeDesc: 'Ekranda menü çubuğunu görüntüle',
          modeOff: 'Kapalı',
          modeAuto: 'Otomatik gizle',
          modeAlways: 'Her zaman görünür',
          keyboardLedStatus: 'Klavye kilidi göstergeleri',
          keyboardLedStatusDesc:
            'Uzak bilgisayarın Num Lock, Caps Lock ve Scroll Lock durumunu göster',
          icons: 'Alt Menü Simgeleri',
          iconsDesc: 'Menü çubuğunda alt menü simgelerini görüntüle'
        }
      },
      keyboardLedStatus: {
        groupLabel: 'Uzak klavye kilidi durumu',
        indicatorLabel: '{{label}}: {{state}}',
        numLock: 'Num Lock',
        numLockShort: 'Num',
        capsLock: 'Caps Lock',
        capsLockShort: 'Caps',
        scrollLock: 'Scroll Lock',
        scrollLockShort: 'Scr',
        on: 'Açık',
        off: 'Kapalı',
        unknown: 'Bilinmiyor'
      },
      device: {
        title: 'Cihaz',
        oled: {
          title: 'OLED'
        },
        ssh: {},
        swap: {
          title: 'Swap',
          description: 'Swap dosyasının boyutunu belirle'
        },
        mouseJiggler: {
          title: 'Fare Oynatıcı',
          description: 'Uzak ana bilgisayarın uykuya geçmesini engeller',
          disable: 'Devre dışı bırak',
          absolute: 'Mutlak mod',
          relative: 'Bağıl mod'
        },
        mdns: {
          description: 'mDNS keşif hizmetini etkinleştir',
          tip: 'Kullanmıyorsanız devre dışı bırakabilirsiniz'
        },
        hdmi: {
          idleTimeoutTitle: 'Etkin olmayan yakalama zaman aşımı',
          idleTimeoutDescription:
            'Etkin görüntüleyici olmadığında HDMI yakalamayı şu süre sonunda durdur:'
        },
        hidOnly: 'Yalnızca HID modu',
        disk: 'Sanal Disk',
        network: 'Sanal Ağ',
        networkDesc: 'Sanal ağ kartını uzak ana bilgisayara bağla',
        reboot: 'Yeniden Başlat',
        rebootDesc: "NanoKVM'i yeniden başlatmak istediğinizden emin misiniz?"
      },
      network: {
        title: 'Ağ',
        wifi: {
          title: 'Wi-Fi',
          description: 'Wi-Fi ayarlayın',
          apMode: "AP modu etkin, QR kodu tarayarak Wi-Fi'ye bağlanın",
          connect: "Wi-Fi'ye bağlan",
          connectDesc1: "Lütfen ağ SSID'sini ve parolayı girin",
          disconnect: 'Ağ bağlantısını kesmek istediğinizden emin misiniz?',
          ssid: 'Ad',
          password: 'Parola',
          joinBtn: 'Katıl',
          cancelBtn: 'İptal'
        },
        tls: {
          description: 'HTTPS protokolünü etkinleştir'
        },
        dns: {
          title: 'DNS',
          description: 'NanoKVM için DNS sunucularını yapılandır',
          ipv4Title: 'IPv4',
          ipv4Description: 'Kablolu arayüz için IPv4 adreslemeyi yapılandır',
          dhcp: 'DHCP',
          manual: 'Manuel',
          apply: 'Uygula',
          invalid: 'Geçerli bir IPv4 veya IPv6 adresi girin',
          invalidNetwork: 'Geçerli bir IPv4 adresi, alt ağ maskesi ve yönlendirici girin',
          saved: 'DNS ayarları kaydedildi',
          redirecting: 'Ağ ayarları kaydedildi. Yeni adres açılıyor...',
          saveFailed: 'DNS ayarları kaydedilemedi',
          unsaved: 'Kaydedilmemiş değişiklikler',
          maxServers: 'En fazla {{count}} DNS sunucusuna izin verilir',
          dhcpServersDescription: "DNS sunucuları DHCP'den otomatik olarak alınır",
          interface: 'Arayüz',
          ipAddress: 'IP Adresi',
          subnetMask: 'Alt Ağ Maskesi',
          router: 'Yönlendirici'
        }
      },
      tailscale: {
        title: 'Tailscale',
        memory: {
          title: 'Bellek optimizasyonu',
          tip: "Bellek kullanımı sınırı aştığında, belleği boşaltmak amacıyla çöp toplama işlemi daha agresif bir şekilde gerçekleştirilir. Tailscale kullanıyorsanız bu değerin 75 MB olarak ayarlanması önerilir. Değişikliğin etkili olabilmesi için Tailscale'in yeniden başlatılması gerekir."
        },
        swap: {
          title: 'Belleği değiştir',
          tip: 'Bellek optimizasyonunu etkinleştirdikten sonra sorunlar devam ederse, takas belleğini etkinleştirmeyi deneyin. Bu, takas dosyası boyutunu varsayılan olarak 256MB olarak ayarlar ve bu, "Ayarlar > Cihaz" bölümünden ayarlanabilir.'
        },
        restart: "Tailscale'i yeniden başlat?",
        stop: "Tailscale'i durdur?",
        loading: 'Yükleniyor...',
        download: 'İndir',
        package: 'yükleme paketi',
        unzip: 'sıkışmış dosyayı açın',
        upTailscale: "tailscale dosyasını NanoKVM'in /usr/bin dizinine yükleyin",
        upTailscaled: "tailscaled dosyasını NanoKVM'in /usr/sbin dizinine yükleyin",
        refresh: 'İçinde bulunduğunuz sayfayı yenileyin',
        notRunning: 'Tailscale çalışmıyor. Devam etmek için lütfen başlatın.',
        run: 'Başlat',
        notLogin: 'Cihaz bağlı değil. Lütfen giriş yapıp cihazınızı hesabınıza bağlayın.',
        login: 'Giriş yap',
        loginSuccess: 'Giriş yapıldı',
        deviceName: 'Cihaz Adı',
        deviceIP: 'Cihaz IP adresi',
        account: 'Hesap',
        logout: 'Çıkış yap',
        logoutDesc: 'Çıkış yapmak istediğinizden emin misiniz?',
        uninstall: "Tailscale'i kaldır",
        uninstallDesc: "Tailscale'i kaldırmak istediğinizden emin misiniz?",
        okBtn: 'Evet',
        cancelBtn: 'Hayır'
      },
      update: {
        title: 'Güncelleştirmeleri kontrol et',
        queryFailed: 'Sürüm bilgisi alınamadı',
        updateFailed: 'Güncelleme başarısız oldu. Lütfen tekrar deneyin.',
        isLatest: 'En yeni sürüme sahipsiniz.',
        available: 'Bir güncelleme indirilebilir. Şimdi güncellemek istediğinizden emin misiniz?',
        updating: 'Güncelleme başlatıldı. Lütfen bekleyin...',
        confirm: 'Onayla',
        cancel: 'İptal',
        preview: 'Ön İzleme Güncellemeleri',
        offline: {
          title: 'Çevrimdışı Güncellemeler',
          desc: 'Yerel kurulum paketi aracılığıyla güncelleme',
          upload: 'Yükle',
          invalidName: 'Geçersiz dosya adı biçimi. Lütfen GitHub sürümlerinden indirin.',
          updateFailed: 'Güncelleme başarısız oldu. Lütfen tekrar deneyin.'
        }
      },
      account: {
        title: 'Hesap',
        webAccount: 'Web Hesap Adı',
        password: 'Şifre',
        updateBtn: 'Değiştir',
        logoutDesc: 'Çıkış yapmak istediğinizden emin misiniz?',
        okBtn: 'Evet',
        cancelBtn: 'Hayır'
      }
    },
    picoclaw: {
      title: 'PicoClaw Asistan',
      inputPlaceholder: "PicoClaw'nin ne yapmasını istediğinizi açıklayın",
      newConversation: 'Yeni görüşme',
      processing: 'İşleniyor...',
      agent: {
        defaultTitle: 'Genel Asistan',
        kvmTitle: 'Uzaktan Kontrol',
        switched: 'Temsilci rolü değiştirildi',
        switchFailed: 'Temsilci rolü değiştirilemedi'
      },
      send: 'Gönder',
      cancel: 'İptal',
      status: {
        connecting: 'Ağ geçidine bağlanılıyor...',
        connected: 'PicoClaw oturumu bağlandı',
        disconnected: 'PicoClaw oturumu bağlantısı kesildi',
        stopped: 'Durdurma isteği gönderildi',
        runtimeStarted: 'PicoClaw runtime başlatıldı',
        runtimeStartFailed: 'PicoClaw runtime başlatılamadı',
        runtimeStopped: 'PicoClaw runtime durduruldu',
        runtimeStopFailed: 'PicoClaw runtime durdurulamadı'
      },
      connection: {
        runtime: {
          checking: 'Kontrol ediliyor',
          ready: 'Runtime hazır',
          stopped: 'Runtime durduruldu',
          unavailable: 'Runtime mevcut değil',
          configError: 'Yapılandırma hatası'
        },
        transport: {
          connecting: 'Bağlanıyor',
          connected: 'Bağlandı'
        },
        run: {
          idle: 'Boşta',
          busy: 'Meşgul'
        }
      },
      message: {
        toolAction: 'Eylem',
        observation: 'Gözlem',
        screenshot: 'Ekran Görüntüsü'
      },
      overlay: {
        locked: 'PicoClaw cihazı kontrol ediyor. Manuel giriş duraklatıldı.'
      },
      install: {
        install: 'Yükle PicoClaw',
        installing: 'PicoClaw yükleniyor',
        success: 'PicoClaw başarıyla yüklendi',
        failed: 'PicoClaw yüklenemedi',
        uninstalling: 'Runtime kaldırılıyor...',
        requiredTitle: 'PicoClaw kurulu değil',
        requiredDescription: "PicoClaw runtime'ı başlatmadan önce PicoClaw'ı yükleyin.",
        progressDescription: 'PicoClaw indiriliyor ve kuruluyor.',
        stages: {
          preparing: 'Hazırlanıyor',
          downloading: 'İndiriliyor',
          extracting: 'Çıkarılıyor',
          verifying: 'Doğrulanıyor',
          installing: 'Yükleniyor',
          installed: 'Yüklendi',
          install_timeout: 'Zaman Aşımı',
          install_failed: 'Başarısız'
        }
      },
      model: {
        requiredTitle: 'Model yapılandırması gerekli',
        requiredDescription: 'PicoClaw sohbetini kullanmadan önce PicoClaw modelini yapılandırın.',
        docsTitle: 'Yapılandırma Kılavuzu',
        docsDesc: 'Desteklenen modeller ve protokoller',
        menuLabel: 'Modeli yapılandır',
        modelIdentifier: 'Model Tanımlayıcı',
        modelIdentifierPlaceholder: 'openai/gpt-5.4',
        apiBase: 'API Base URL',
        apiBasePlaceholder: 'https://api.example.com/v1',
        apiKey: 'API Anahtarı',
        apiKeyPlaceholder: 'Model API anahtarını girin',
        save: 'Kaydet',
        saving: 'Kaydediliyor',
        saved: 'Model yapılandırması kaydedildi',
        saveFailed: 'Model yapılandırması kaydedilemedi',
        invalid: 'Model tanımlayıcı, API Base URL ve API anahtarı gereklidir'
      },
      uninstall: {
        menuLabel: 'Kaldırma',
        confirmTitle: 'Kaldırma PicoClaw',
        confirmContent:
          "PicoClaw'yi kaldırmak istediğinizden emin misiniz? Bu, yürütülebilir dosyayı ve tüm yapılandırma dosyalarını siler.",
        confirmOk: 'Kaldırma'
      },
      history: {
        title: 'Geçmiş',
        loading: 'Oturumlar yükleniyor...',
        emptyTitle: 'Henüz geçmiş yok',
        emptyDescription: 'Önceki PicoClaw oturumlar burada görünecek.',
        loadFailed: 'Oturum geçmişi yüklenemedi',
        deleteFailed: 'Oturum silinemedi',
        deleteConfirmTitle: 'Oturumu sil',
        deleteConfirmContent: '"{{title}}" silmek istediğinizden emin misiniz?',
        deleteConfirmOk: 'Sil',
        messageCount_one: '{{count}} mesaj',
        messageCount_other: '{{count}} mesaj'
      },
      config: {
        startRuntime: "PicoClaw'ı Başlat",
        stopRuntime: "PicoClaw'ı Durdur"
      },
      start: {
        title: "PicoClaw'ı Başlat",
        description: "PicoClaw yardımcısını kullanmaya başlamak için runtime'ı başlatın."
      }
    },
    error: {
      refresh: 'Yenile'
    },
    fullscreen: {
      toggle: 'Tam ekrana geç'
    },
    menu: {
      collapse: 'Menüyü küçült'
    }
  }
};

export default tr;
