const id = {
  translation: {
    common: {
      confirm: 'Konfirmasi',
      cancel: 'Batalkan',
      delete: 'Hapus',
      actionFailed: 'Operasi gagal',
      loading: 'Memuat pengaturan dari perangkat...',
      loadFailed: 'Gagal memuat pengaturan dari perangkat',
      retry: 'Coba lagi'
    },
    head: {
      desktop: 'Desktop jarak jauh',
      login: 'Masuk',
      changePassword: 'Ubah Sandi',
      terminal: 'Terminal',
      wifi: 'Wi-Fi'
    },
    auth: {
      login: 'Masuk',
      locked: 'Terlalu banyak login, silakan coba lagi nanti',
      globalLocked: 'Sistem dalam perlindungan, silakan coba lagi nanti',
      changePassword: 'Ganti Sandi',
      forgetPassword: 'Lupa Sandi',
      ok: 'Ok',
      cancel: 'Batalkan',
      loginButtonText: 'Masuk',
      tips: {
        change1: 'Perhatikan bahwa tindakan ini akan mengubah kata sandi berikut:',
        change2: 'Kata sandi login web'
      }
    },
    wifi: {
      title: 'Wi-Fi',
      description: 'Konfigurasi Wi-Fi untuk NanoKVM',
      invalidMode:
        'Mode saat ini tidak mendukung pengaturan jaringan. Silakan buka perangkat Anda dan aktifkan mode konfigurasi Wi-Fi.',
      confirmBtn: 'Ok',
      finishBtn: 'Selesai',
      ap: {
        authTitle: 'Otentikasi Diperlukan',
        authDescription: 'Silakan masukkan kata sandi AP untuk melanjutkan',
        authFailed: 'Kata sandi AP tidak valid',
        passPlaceholder: 'AP kata sandi',
        verifyBtn: 'Verifikasi'
      }
    },
    screen: {
      scale: 'Skala',
      title: 'Layar',
      video: 'Mode Video',
      resolution: 'Resolusi',
      auto: 'Otomatis',
      autoTips:
        'Tearing layar atau offset tetikus dapat terjadi pada resolusi tertentu. Pertimbangkan untuk menyesuaikan resolusi host jarak jauh atau menonaktifkan mode otomatis.',
      fps: 'FPS',
      customizeFps: 'Sesuaikan',
      quality: 'Kualitas',
      qualityLossless: 'Tanpa Kehilangan',
      qualityHigh: 'Tinggi',
      qualityMedium: 'Sedang',
      qualityLow: 'Rendah',
      frameDetect: 'Deteksi bingkai',
      frameDetectTip:
        'Hitung selisih antar frame. Hentikan transmisi aliran video saat tidak ada perubahan yang terdeteksi di layar host jarak jauh.',
      resetHdmi: 'Atur ulang HDMI',
      webrtcConnectionFailed: {
        title: 'Koneksi WebRTC gagal'
      },
      captureStatus: {
        hdmiError: 'Kesalahan layar HDMI',
        unsupportedResolution: 'Resolusi saat ini tidak didukung',
        retrieving: 'Mengambil layar...',
        changingResolution: 'Mengganti resolusi...',
        updateFailed: 'Layar tidak dapat diperbarui saat ini',
        videoError: 'Kesalahan tampilan video',
        noHdmi: 'Sinyal HDMI tidak terdeteksi',
        unavailable: 'Layar tidak dapat ditampilkan saat ini'
      }
    },
    keyboard: {
      title: 'Keyboard',
      paste: 'Tempel',
      tips: 'Hanya huruf dan simbol keyboard standar yang didukung',
      placeholder: 'Silahkan isi',
      virtual: 'Keyboard',
      readClipboard: 'Membaca dari Papan Klip',
      clipboardPermissionDenied:
        'Izin papan klip ditolak. Harap izinkan akses clipboard di browser Anda.',
      clipboardReadError: 'Gagal membaca papan klip',
      dropdownEnglish: 'Bahasa Inggris',
      shortcut: {
        title: 'Pintasan',
        capture: 'Klik di sini untuk mengambil pintasan',
        save: 'Simpan'
      },
      leaderKey: {
        title: 'Tombol Leader',
        howToUse: 'Cara Menggunakan',
        simultaneous: {
          title: 'Mode Simultan',
          desc1: 'Tekan dan tahan tombol Leader, lalu tekan pintasan.',
          desc2: 'Intuitif, tetapi mungkin bertentangan dengan pintasan sistem.'
        },
        sequential: {
          title: 'Mode Berurutan',
          desc1:
            'Tekan tombol Leader → tekan pintasan secara berurutan → tekan tombol Leader lagi.',
          desc2: 'Memerlukan lebih banyak langkah, namun sepenuhnya menghindari konflik sistem.'
        },
        enable: 'Aktifkan tombol Leader',
        tip: 'Saat ditetapkan sebagai tombol Leader, tombol ini hanya berfungsi sebagai pemicu pintasan dan kehilangan perilaku defaultnya.',
        placeholder: 'Tekan tombol Leader',
        shiftRight: 'Shift kanan',
        ctrlRight: 'Ctrl kanan',
        metaRight: 'Win kanan',
        recorder: {
          rec: 'REKAM',
          activate: 'Aktifkan tombol',
          input: 'Silakan tekan pintasan...'
        }
      }
    },
    mouse: {
      cursor: 'Gaya kursor',
      default: 'Kursor bawaan',
      cell: 'Kursor cell',
      text: 'Kursor teks',
      grab: 'Kursor ambil',
      hide: 'Sembunyikan kursor',
      mode: 'Mode tetikus',
      absolute: 'Mode absolut',
      relative: 'Mode relatif',
      direction: 'Arah roda gulir',
      scrollUp: 'Gulir ke atas',
      scrollDown: 'Gulir ke bawah',
      speed: 'Kecepatan roda gulir',
      fast: 'Cepat',
      slow: 'Lambat',
      requestPointer:
        'Menggunakan mode relatf. Silakan klik desktop untuk mendapatkan penunjuk tetikus.',
      resetHid: 'Setel ulang HID',
      hidOnly: {
        title: 'Mode hanya HID',
        tip1: 'Mengaktifkan mode HID-Hanya akan melepas U-disk virtual dan jaringan virtual',
        tip2: 'Dalam mode HID-Only, pemasangan gambar dinonaktifkan',
        tip3: 'NanoKVM akan otomatis reboot setelah berpindah mode',
        enable: 'Aktifkan mode HID-Hanya',
        disable: 'Nonaktifkan mode HID-Hanya'
      }
    },
    image: {
      title: 'Gambar',
      loading: 'Memuat...',
      empty: 'Tidak ada yang ditemukan',
      mountMode: 'Mode pemasangan',
      mountFailed: 'Pemasangan Gagal',
      unmountFailed: 'Pelepasan gagal',
      forceEject: 'Paksa keluarkan',
      forceEjectConfirm:
        'Host telah mengunci drive optik. Memaksa pengeluaran akan memutuskan perangkat USB virtual sesaat, sehingga keyboard dan mouse dapat terputus sebentar. Lanjutkan?',
      deleteConfirm: 'Apakah Anda yakin ingin menghapus gambar ini?',
      tips: {
        title: 'Cara mengunggah',
        usb1: 'Hubungkan NanoKVM ke komputer Anda melalui USB.',
        usb3: 'Buka disk virtual di komputer Anda dan salin file gambar ke direktori root disk virtual.',
        scp1: 'Pastikan NanoKVM dan komputer Anda berada di jaringan lokal yang sama.',
        scp2: 'Buka terminal di komputer Anda dan gunakan perintah SCP untuk mengunggah file gambar ke direktori /data di NanoKVM.',
        scp3: 'Contoh: scp jalur-gambar-anda root@ip-nanokvm-anda:/data',
        tfCard: 'Kartu TF',
        tf1: 'Metode ini didukung di sistem linux',
        tf3: 'Masukkan Kartu TF ke pembaca kartu dan hubungkan ke komputer Anda.',
        tf4: 'Salin berkas gambar ke direktori /data pada Kartu TF.',
        tf5: 'Masukkan Kartu TF ke dalam NanoKVM.'
      }
    },
    script: {
      title: 'Script',
      upload: 'Mengunggah',
      run: 'Jalankan',
      runBackground: 'Jalankan di belakang',
      runFailed: 'Gagal menjalankan',
      delete: 'Hapus',
      close: 'Tutup'
    },
    terminal: {
      title: 'Terminal',
      nanokvm: 'Terminal NanoKVM',
      serial: 'Terminal Port Serial',
      serialPort: 'Port Serial',
      serialPortPlaceholder: 'Silahkan masukkan port serial',
      baudrate: 'Baud rate',
      parity: 'Paritas',
      parityNone: 'Tidak ada',
      parityEven: 'Genap',
      parityOdd: 'Ganjil',
      flowControl: 'Kontrol aliran',
      flowControlNone: 'Tidak ada',
      flowControlSoft: 'Perangkat lunak',
      flowControlHard: 'Perangkat keras',
      dataBits: 'Bit data',
      stopBits: 'Hentikan bit'
    },
    wol: {
      title: 'Wake-on-LAN',
      sent: 'Perintah terkirim',
      input: 'Silahkan masukkan MAC',
      ok: 'Ok'
    },
    download: {
      title: 'Pengunduh Gambar',
      input: 'Silakan masukkan gambar jarak jauh URL',
      ok: 'Ok',
      mountedImage:
        'Image ini sedang di-mount. Lepaskan mount-nya sebelum mengunggah berkas dengan nama yang sama.',
      uploadbox: 'Letakkan file di sini atau klik untuk memilih',
      inputfile: 'Silakan masukkan File gambar',
      NoISO: 'Tidak ada ISO',
      sha256Placeholder: 'Masukkan checksum SHA-256 64 karakter',
      invalidSHA256: 'SHA-256 harus berupa string heksadesimal 64 karakter',
      checksumFailed: 'Unduhan gagal: verifikasi SHA-256 gagal'
    },
    power: {
      title: 'Daya',
      showConfirm: 'Konfirmasi',
      showConfirmTip: 'Pengoperasian listrik memerlukan konfirmasi tambahan',
      resetConfirm: 'Lanjutkan operasi penyetelan ulang?',
      powerConfirm: 'Lanjutkan pengoperasian listrik?',
      okBtn: 'Ya',
      cancelBtn: 'Tidak'
    },
    settings: {
      title: 'Pengaturan',
      about: {
        title: 'Tentang NanoKVM',
        information: 'Informasi',
        ip: 'IP',
        mdns: 'mDNS',
        application: 'Versi Aplikasi',
        applicationTip: 'Versi aplikasi web NanoKVM',
        community: 'Komunitas',
        hostname: 'Nama Host',
        hostnameUpdated: 'Nama host diperbarui. Nyalakan ulang untuk menerapkan.',
        ipType: {}
      },
      appearance: {
        title: 'Tampilan',
        display: 'Layar',
        language: 'Bahasa',
        languageDesc: 'Pilih bahasa untuk antarmuka',
        webTitle: 'Judul Web',
        webTitleDesc: 'Menyesuaikan judul halaman web',
        menuBar: {
          title: 'Bilah Menu',
          mode: 'Mode Tampilan',
          modeDesc: 'Menampilkan bilah menu di layar',
          modeOff: 'Mati',
          modeAuto: 'Sembunyikan otomatis',
          modeAlways: 'Selalu terlihat',
          keyboardLedStatus: 'Indikator kunci keyboard',
          keyboardLedStatusDesc:
            'Tampilkan status Num Lock, Caps Lock, dan Scroll Lock komputer jarak jauh',
          icons: 'Ikon Submenu',
          iconsDesc: 'Menampilkan ikon submenu di bilah menu'
        }
      },
      keyboardLedStatus: {
        groupLabel: 'Status kunci keyboard jarak jauh',
        indicatorLabel: '{{label}}: {{state}}',
        numLock: 'Num Lock',
        numLockShort: 'Num',
        capsLock: 'Caps Lock',
        capsLockShort: 'Caps',
        scrollLock: 'Scroll Lock',
        scrollLockShort: 'Scr',
        on: 'Aktif',
        off: 'Nonaktif',
        unknown: 'Tidak diketahui'
      },
      device: {
        title: 'Perangkat',
        oled: {
          title: 'OLED'
        },
        ssh: {
          description: 'Aktifkan akses jarak jauh SSH'
        },
        swap: {
          title: 'Tukar',
          description: 'Atur ukuran file swap'
        },
        mouseJiggler: {
          title: 'Tikus Jiggler',
          description: 'Mencegah host jarak jauh tertidur',
          disable: 'Nonaktifkan',
          absolute: 'Mode Absolut',
          relative: 'Mode Relatif'
        },
        mdns: {
          description: 'Aktifkan layanan penemuan mDNS',
          tip: 'Mematikan jika tidak diperlukan'
        },
        hdmi: {
          description: 'Aktifkan keluaran HDMI/monitor',
          idleTimeoutTitle: 'Batas waktu tangkapan tidak aktif',
          idleTimeoutDescription: 'Hentikan tangkapan HDMI setelah tidak ada penonton aktif selama'
        },
        hidOnly: 'HID-Mode Hanya',
        disk: 'Disk virtual',
        network: 'Jaringan virtual',
        networkDesc: 'Pasang kartu jaringan virtual pada host jarak jauh',
        reboot: 'Mulai ulang',
        rebootDesc: 'Apakah Anda yakin ingin me-reboot NanoKVM?'
      },
      network: {
        title: 'Jaringan',
        wifi: {
          title: 'Wi-Fi',
          description: 'Konfigurasi Wi-Fi',
          apMode: 'Mode AP aktif, sambungkan ke Wi-Fi dengan memindai kode QR',
          connect: 'Hubungkan Wi-Fi',
          connectDesc1: 'Masukkan SSID jaringan dan kata sandi',
          disconnect: 'Yakin ingin memutuskan jaringan?',
          ssid: 'Nama',
          password: 'Kata sandi',
          joinBtn: 'Gabung',
          cancelBtn: 'Batal'
        },
        tls: {
          description: 'Aktifkan protokol HTTPS'
        },
        dns: {
          title: 'DNS',
          description: 'Konfigurasi server DNS untuk NanoKVM',
          ipv4Title: 'IPv4',
          ipv4Description: 'Konfigurasikan pengalamatan IPv4 untuk antarmuka kabel',
          dhcp: 'DHCP',
          manual: 'Manual',
          apply: 'Terapkan',
          invalid: 'Masukkan alamat IPv4 atau IPv6 yang valid',
          invalidNetwork: 'Masukkan alamat IPv4, subnet mask, dan router yang valid',
          saved: 'Pengaturan DNS disimpan',
          redirecting: 'Pengaturan jaringan disimpan. Membuka alamat baru...',
          saveFailed: 'Gagal menyimpan pengaturan DNS',
          unsaved: 'Perubahan belum disimpan',
          maxServers: 'Maksimal {{count}} server DNS diizinkan',
          dhcpServersDescription: 'Server DNS diperoleh otomatis dari DHCP',
          interface: 'Antarmuka',
          ipAddress: 'Alamat IP',
          subnetMask: 'Subnet mask',
          router: 'Router'
        }
      },
      tailscale: {
        title: 'Tailscale',
        memory: {
          title: 'Optimasi memori'
        },
        swap: {
          title: 'Tukar memori',
          tip: 'Jika masalah terus berlanjut setelah mengaktifkan pengoptimalan memori, coba aktifkan memori swap. Ini menetapkan ukuran file swap ke 256MB secara default, yang dapat disesuaikan di "Pengaturan > Perangkat".'
        },
        loading: 'Memuat...',
        install: 'Memasang',
        installing: 'Memasangkan',
        failed: 'Gagal memasangkan',
        download: 'Mengunduh',
        package: 'paket instalasi',
        unzip: 'dan unzip itu',
        upTailscale: 'Unggah tailscale ke direktori NanoKVM /usr/bin/',
        upTailscaled: 'Unggah tailscaled ke direktori NanoKVM /usr/sbin/',
        refresh: 'Segarkan halaman ini',
        notRunning: 'Tailscale tidak berjalan. Silakan mulai untuk melanjutkan.',
        run: 'Mulai',
        notLogin:
          'Perangkat belum ditautkan. Silakan masuk dan tautkan perangkat ini ke akun Anda.',
        urlPeriod: 'Url ini berlaku selama 10 menit',
        login: 'Masuk',
        loginSuccess: 'Berhasil masuk',
        deviceName: 'Nama Perangkat',
        deviceIP: 'IP Perangkat',
        account: 'Akun',
        logout: 'Keluar',
        logoutDesc: 'Apakah Anda yakin ingin logout?',
        uninstall: 'Copot pemasangan Tailscale',
        uninstallDesc: 'Apakah Anda yakin ingin menghapus instalan Tailscale?'
      },
      update: {
        title: 'Periksa pembaruan',
        queryFailed: 'Gagal mendapatkan versi',
        updateFailed: 'Gagal memperbarui, tolong coba lagi.',
        updating: 'Pembaruan dimulai. Silahkan tunggu...',
        confirm: 'Konfirmasi',
        cancel: 'Batalkan',
        preview: 'Pratinjau Pembaruan',
        offline: {
          title: 'Pembaruan Offline',
          desc: 'Perbarui melalui paket instalasi lokal',
          upload: 'Mengunggah',
          invalidName: 'Format nama file tidak valid. Silakan unduh dari rilis GitHub.',
          updateFailed: 'Gagal memperbarui, tolong coba lagi.'
        }
      },
      account: {
        title: 'Akun',
        webAccount: 'Nama akun web',
        password: 'Kata sandi',
        updateBtn: 'Update',
        logoutBtn: 'Keluar',
        logoutDesc: 'Apakah Anda yakin ingin logout?',
        okBtn: 'Ya',
        cancelBtn: 'Tidak'
      }
    },
    picoclaw: {
      title: 'PicoClaw Asisten',
      inputPlaceholder: 'Jelaskan apa yang Anda ingin PicoClaw lakukan',
      newConversation: 'Percakapan baru',
      processing: 'Memproses...',
      agent: {
        defaultTitle: 'Asisten umum',
        kvmTitle: 'Kontrol jarak jauh',
        switched: 'Peran agen dialihkan',
        switchFailed: 'Gagal mengganti peran agen'
      },
      send: 'Kirim',
      cancel: 'Batalkan',
      status: {
        connecting: 'Menghubungkan ke gerbang...',
        connected: 'Sesi PicoClaw terhubung',
        disconnected: 'Sesi PicoClaw ditutup',
        stopped: 'Permintaan penghentian terkirim',
        runtimeStarted: 'Runtime PicoClaw dimulai',
        runtimeStartFailed: 'Gagal memulai Runtime PicoClaw',
        runtimeStopped: 'Runtime PicoClaw dihentikan',
        runtimeStopFailed: 'Gagal menghentikan Runtime PicoClaw'
      },
      connection: {
        runtime: {
          checking: 'Memeriksa',
          ready: 'Runtime siap',
          stopped: 'Runtime dihentikan',
          unavailable: 'Runtime tidak tersedia',
          configError: 'Kesalahan konfigurasi'
        },
        transport: {
          connecting: 'Menghubungkan',
          connected: 'Terhubung'
        },
        run: {
          idle: 'Menganggur',
          busy: 'Sibuk'
        }
      },
      message: {
        toolAction: 'Aksi',
        observation: 'Pengamatan',
        screenshot: 'Tangkapan layar'
      },
      overlay: {
        locked: 'PicoClaw sedang mengendalikan perangkat. Input manual dijeda.'
      },
      install: {
        install: 'Instal PicoClaw',
        installing: 'Menginstal PicoClaw',
        success: 'PicoClaw berhasil diinstal',
        failed: 'Gagal menginstal PicoClaw',
        uninstalling: 'Mencopot pemasangan runtime...',
        requiredTitle: 'PicoClaw tidak diinstal',
        requiredDescription: 'Instal PicoClaw sebelum memulai runtime PicoClaw.',
        progressDescription: 'PicoClaw sedang diunduh dan diinstal.',
        stages: {
          preparing: 'Mempersiapkan',
          downloading: 'Mengunduh',
          extracting: 'Mengekstraksi',
          verifying: 'Memverifikasi',
          installing: 'Memasangkan',
          installed: 'Terpasang',
          install_timeout: 'Waktu Habis',
          install_failed: 'Gagal'
        }
      },
      model: {
        requiredTitle: 'Konfigurasi model diperlukan',
        requiredDescription: 'Konfigurasikan model PicoClaw sebelum menggunakan obrolan PicoClaw.',
        docsTitle: 'Panduan Konfigurasi',
        docsDesc: 'Model dan protokol yang didukung',
        menuLabel: 'Konfigurasi model',
        modelIdentifier: 'Pengenal Model',
        modelIdentifierPlaceholder: 'openai/gpt-5.4',
        apiBase: 'API Base URL',
        apiBasePlaceholder: 'https://api.example.com/v1',
        apiKey: 'Kunci API',
        apiKeyPlaceholder: 'Masukkan kunci API model',
        save: 'Simpan',
        saving: 'Menyimpan',
        saved: 'Konfigurasi model disimpan',
        saveFailed: 'Gagal menyimpan konfigurasi model',
        invalid: 'Pengidentifikasi model, API Base URL, dan kunci API wajib diisi'
      },
      uninstall: {
        menuLabel: 'Copot pemasangan',
        confirmTitle: 'Copot pemasangan PicoClaw',
        confirmContent:
          'Apakah Anda yakin ingin menghapus instalan PicoClaw? Ini akan menghapus semua file yang dapat dieksekusi dan konfigurasi.',
        confirmOk: 'Copot pemasangan'
      },
      history: {
        title: 'Riwayat',
        loading: 'Memuat sesi...',
        emptyTitle: 'Belum ada riwayat',
        emptyDescription: 'Sesi PicoClaw sebelumnya akan muncul di sini.',
        loadFailed: 'Gagal memuat riwayat sesi',
        deleteFailed: 'Gagal menghapus sesi',
        deleteConfirmTitle: 'Hapus sesi',
        deleteConfirmContent: 'Apakah Anda yakin ingin menghapus "{{title}}"?',
        deleteConfirmOk: 'Hapus',
        messageCount_one: '{{count}} pesan',
        messageCount_other: '{{count}} pesan'
      },
      config: {
        startRuntime: 'Mulai PicoClaw',
        stopRuntime: 'Hentikan PicoClaw'
      },
      start: {
        title: 'Mulai PicoClaw',
        description: 'Mulai runtime untuk mulai menggunakan asisten PicoClaw.'
      }
    },
    error: {
      title: 'Kami mengalami masalah',
      refresh: 'Segarkan'
    },
    fullscreen: {
      toggle: 'Beralih Layar Penuh'
    },
    menu: {
      collapse: 'Tutup Menu'
    }
  }
};

export default id;
