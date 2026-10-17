const th = {
  translation: {
    common: {
      confirm: 'ยืนยัน',
      cancel: 'ยกเลิก',
      delete: 'ลบ',
      actionFailed: 'การดำเนินการล้มเหลว',
      loading: 'กำลังโหลดการตั้งค่าจากอุปกรณ์...',
      loadFailed: 'ไม่สามารถโหลดการตั้งค่าจากอุปกรณ์ได้',
      retry: 'ลองอีกครั้ง'
    },
    head: {
      desktop: 'เดสก์ท็อประยะไกล',
      login: 'เข้าสู่ระบบ',
      changePassword: 'เปลี่ยนรหัสผ่าน',
      terminal: 'Terminal',
      wifi: 'Wi-Fi'
    },
    auth: {
      login: 'เข้าสู่ระบบ',
      placeholderUsername: 'ชื่อผู้ใช้งาน',
      placeholderPassword2: 'ใส่รหัสผ่านอีกครั้ง',
      noEmptyUsername: 'ต้องใส่ชื่อผู้ใช้งาน',
      invalidUser: 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง',
      locked: 'มีการเข้าสู่ระบบมากเกินไป โปรดลองอีกครั้งในภายหลัง',
      globalLocked: 'ระบบอยู่ระหว่างการป้องกัน โปรดลองอีกครั้งในภายหลัง',
      error: 'เกิดข้อผิดพลาด',
      changePassword: 'เปลี่ยนรหัสผ่าน',
      differentPassword: 'รหัสผ่านไม่ตรงกัน',
      illegalUsername: 'ชื่อผู้ใช้ไม่สามารถมีอักขระที่ไม่ถูกต้อง',
      forgetPassword: 'ลืมรหัสผ่าน',
      ok: 'โอเค',
      cancel: 'ยกเลิก',
      loginButtonText: 'เข้าสู่ระบบ',
      tips: {}
    },
    wifi: {
      title: 'Wi-Fi',
      invalidMode:
        'โหมดปัจจุบันไม่รองรับการตั้งค่าเครือข่าย โปรดไปที่อุปกรณ์ของคุณและเปิดใช้งานโหมดการกำหนดค่า Wi-Fi',
      confirmBtn: 'โอเค',
      finishBtn: 'เสร็จ',
      ap: {
        authTitle: 'จำเป็นต้องมีการรับรองความถูกต้อง',
        authDescription: 'โปรดป้อนรหัสผ่าน AP เพื่อดำเนินการต่อ',
        authFailed: 'รหัสผ่าน AP ไม่ถูกต้อง',
        passPlaceholder: 'AP รหัสผ่าน',
        verifyBtn: 'ตรวจสอบ'
      }
    },
    screen: {
      scale: 'สเกล',
      title: 'หน้าจอ',
      video: 'โหมดวีดีโอ',
      auto: 'อัตโนมัติ',
      autoTips:
        'อาการภาพฉีกขาดหรือเมาส์ไม่ตรงตำแหน่งอาจเกิดขึ้นที่ความละเอียดบางระดับ แนะนำให้ปรับความละเอียดของคอมพิวเตอร์ต้นทางหรือปิดโหมดอัตโนมัติ',
      fps: 'FPS',
      customizeFps: 'กำหนดเอง',
      quality: 'คุณภาพ',
      qualityLossless: 'ไม่สูญเสียคุณภาพ',
      qualityHigh: 'สูง',
      qualityMedium: 'กลาง',
      qualityLow: 'ต่ำ',
      frameDetect: 'ตรวจจับเฟรม',
      frameDetectTip:
        'ระบบจะคำนวณความแตกต่างระหว่างเฟรม และหยุดส่งสตรีมวิดีโอเมื่อไม่พบการเปลี่ยนแปลงบนหน้าจอของคอมพิวเตอร์ต้นทาง',
      resetHdmi: 'รีเช็ท HDMI',
      webrtcConnectionFailed: {
        title: 'การเชื่อมต่อ WebRTC ล้มเหลว',
        description: 'โปรดตรวจสอบการเชื่อมต่อเครือข่ายหรือสลับโหมดวิดีโอ'
      },
      captureStatus: {
        hdmiError: 'ข้อผิดพลาดหน้าจอ HDMI',
        unsupportedResolution: 'ไม่รองรับความละเอียดปัจจุบัน',
        retrieving: 'กำลังดึงหน้าจอ...',
        changingResolution: 'กำลังเปลี่ยนความละเอียด...',
        updateFailed: 'ไม่สามารถอัปเดตหน้าจอได้ในขณะนี้',
        videoError: 'ข้อผิดพลาดในการแสดงวิดีโอ',
        noHdmi: 'ไม่พบสัญญาณ HDMI',
        unavailable: 'ไม่สามารถแสดงหน้าจอได้ในขณะนี้'
      }
    },
    keyboard: {
      paste: 'วาง',
      tips: 'รองรับเฉพาะตัวอักษรและสัญลักษณ์มาตรฐานของแป้นพิมพ์เท่านั้น',
      placeholder: 'กรุณาป้อน',
      virtual: 'คีบอร์ด',
      readClipboard: 'อ่านจากคลิปบอร์ด',
      clipboardPermissionDenied:
        'การอนุญาตคลิปบอร์ดถูกปฏิเสธ โปรดอนุญาตการเข้าถึงคลิปบอร์ดในเบราว์เซอร์ของคุณ',
      clipboardReadError: 'ไม่สามารถอ่านคลิปบอร์ดได้',
      dropdownEnglish: 'ภาษาอังกฤษ',
      shortcut: {
        title: 'ทางลัด',
        custom: 'กำหนดเอง',
        capture: 'คลิกที่นี่เพื่อจับภาพทางลัด',
        save: 'บันทึก',
        enterFullScreen: 'สลับโหมดเต็มหน้าจอ'
      },
      leaderKey: {
        title: 'ปุ่ม Leader',
        desc: 'ข้ามข้อจำกัดของเบราว์เซอร์และส่งทางลัดของระบบไปยังโฮสต์ระยะไกลโดยตรง',
        howToUse: 'วิธีการใช้งาน',
        simultaneous: {
          title: 'โหมดพร้อมกัน',
          desc1: 'กดปุ่ม Leader ค้างไว้ แล้วกดปุ่มลัด',
          desc2: 'ใช้งานง่าย แต่อาจขัดแย้งกับทางลัดของระบบ'
        },
        sequential: {
          title: 'โหมดต่อเนื่อง',
          desc1: 'กดปุ่ม Leader → กดปุ่มลัดตามลำดับ → กดปุ่ม Leader อีกครั้ง',
          desc2: 'ต้องมีขั้นตอนเพิ่มเติม แต่หลีกเลี่ยงความขัดแย้งของระบบโดยสิ้นเชิง'
        },
        enable: 'เปิดใช้งานปุ่ม Leader',
        tip: 'เมื่อตั้งเป็นปุ่ม Leader ปุ่มนี้จะใช้เป็นตัวเรียกปุ่มลัดเท่านั้น และจะไม่ทำงานตามค่าเริ่มต้นอีกต่อไป',
        placeholder: 'กรุณากดปุ่ม Leader',
        shiftRight: 'Shift ขวา',
        ctrlRight: 'Ctrl ขวา',
        metaRight: 'Win ขวา',
        recorder: {
          rec: 'บันทึก',
          activate: 'เปิดใช้งานปุ่ม',
          input: 'กรุณากดทางลัด...'
        }
      }
    },
    mouse: {
      title: 'เมาส์',
      cursor: 'รูปแบบเคอร์เซอร์',
      default: 'ตัวชี้เริ่มต้น',
      cell: 'ตัวชี้แบบเซลล์',
      text: 'ตัวชี้แบบข้อความ',
      grab: 'ตัวชี้แบบจับ',
      hide: 'ซ่อนตัวชี้',
      mode: 'โหมดเมาส์',
      absolute: 'โหมดสัมบูรณ์',
      relative: 'โหมดสัมพัทธ์',
      direction: 'ทิศทางล้อเลื่อน',
      scrollUp: 'เลื่อนขึ้น',
      scrollDown: 'เลื่อนลง',
      speed: 'ความเร็วล้อเลื่อน',
      fast: 'รวดเร็ว',
      slow: 'ช้า',
      requestPointer: 'กำลังใช้โหมดสัมพัทธ์ กรุณาคลิกที่เดสก์ท็อปเพื่อรับตัวชี้เมาส์',
      resetHid: 'รีเซ็ต HID',
      hidOnly: {
        title: 'โหมด HID เท่านั้น',
        tip1: 'การเปิดโหมด HID-Only จะปิดการทำงานดิสก์จำลองและ NIC จำลอง',
        tip2: 'ในโหมด HID-Only ดิสก์จะลองจะถูกปิดใช้งาน',
        tip3: 'NanoKVM จะรีบูตอัตโนมัติหลังจากเปลี่ยนโหมด',
        enable: 'เปิดใช้งานโหมด HID-Only',
        disable: 'ปิดใช้งานโหมด HID-Only'
      }
    },
    image: {
      title: 'ดิสก์จำลอง',
      loading: 'กำลังโหลด...',
      empty: 'ไม่พบดิสก์',
      mountMode: 'โหมดเมาท์',
      mountFailed: 'การติดตั้งล้มเหลว',
      diskOnWarn:
        'การเมานต์อิมเมจจะปิดดิสก์เสมือน ทำให้คอมพิวเตอร์เข้าถึง /data ไม่ได้อีกต่อไป ดำเนินการต่อหรือไม่?',
      diskOffWarn:
        'ดิสก์เสมือนปิดอยู่ ต้องเปิดก่อนจึงจะเมานต์อิมเมจได้ อุปกรณ์ USB ของคอมพิวเตอร์จะเชื่อมต่อใหม่ ดำเนินการต่อหรือไม่?',
      unmountFailed: 'การถอนติดตั้งล้มเหลว',
      unmountDesc:
        'ในบางระบบ คุณต้องดีดออกจากโฮสต์ระยะไกลด้วยตนเองก่อนที่จะยกเลิกการต่อเชื่อมอิมเมจ',
      forceEject: 'บังคับดีดออก',
      forceEjectConfirm:
        'โฮสต์ได้ล็อกไดรฟ์ออปติคัล การบังคับดีดออกจะตัดการเชื่อมต่ออุปกรณ์ USB เสมือนชั่วขณะ ทำให้คีย์บอร์ดและเมาส์อาจหลุดการเชื่อมต่อชั่วครู่ ดำเนินการต่อหรือไม่?',
      deleteConfirm: 'คุณแน่ใจหรือไม่ว่าต้องการลบภาพนี้?',
      tips: {
        title: 'วิธีการอัปโหลด',
        usb1: 'เชื่อมต่อ NanoKVM กับคอมพิวเตอร์ของคุณผ่าน USB',
        usb3: 'เปิดดิสก์บนคอมพิวเตอร์ของคุณและคัดลอกไฟล์อิมเมจไปยังไดเรกทอรีหลักของดิสก์',
        scp1: 'ตรวจสอบให้แน่ใจว่า NanoKVM และคอมพิวเตอร์ของคุณอยู่ในเครือข่ายเดียวกัน',
        scp2: 'เปิดเทอร์มินัลบนคอมพิวเตอร์ของคุณและใช้คำสั่ง SCP เพื่ออัปโหลดไฟล์อิมเมจไปยังไดเรกทอรี /data บน NanoKVM',
        scp3: 'ตัวอย่าง: scp <ที่อยู่ของไฟล์> root@<ip อุปกรณ์>:/data',
        tfCard: 'การ์ด TF',
        tf1: 'วิธีนี้รองรับแค่บนระบบปฏิบัติการ Linux',
        tf3: 'ใส่การ์ด TF ลงในเครื่องอ่านการ์ดและเชื่อมต่อกับคอมพิวเตอร์ของคุณ',
        tf4: 'คัดลอกไฟล์อิมเมจไปยังไดเรกทอรี /data บนการ์ด TF',
        tf5: 'ใส่การ์ด TF กลับเข้า NanoKVM'
      }
    },
    script: {
      title: 'สคริปต์',
      upload: 'อัปโหลด',
      run: 'เรียกใช้',
      runBackground: 'เรียกใช้ในพื้นหลัง',
      runFailed: 'การเรียกใช้ล้มเหลว',
      delDesc: 'คุณแน่ใจที่จะลบไฟล์นี้หรือไม่?',
      delete: 'ลบ',
      close: 'ปิด'
    },
    terminal: {
      title: 'เทอร์มินอล',
      nanokvm: 'เทอร์มินอลของ NanoKVM',
      serial: 'เทอร์มินอลของ Serial Port',
      serialPort: 'พอร์ตอนุกรม',
      serialPortPlaceholder: 'กรุณาเลือก serial port',
      baudrate: 'อัตราบอด',
      parity: 'พาริตี',
      parityNone: 'ไม่มี',
      parityEven: 'คู่',
      parityOdd: 'คี่',
      flowControl: 'การควบคุมการไหล',
      flowControlNone: 'ไม่มี',
      flowControlSoft: 'ซอฟต์แวร์',
      flowControlHard: 'ฮาร์ดแวร์',
      dataBits: 'บิตข้อมูล',
      stopBits: 'บิตหยุด'
    },
    wol: {
      title: 'Wake-on-LAN',
      sending: 'กำลังส่งคำสั่ง...',
      sent: 'ส่งคำสั่งแล้ว',
      input: 'กรุณาใส่ MAC Address ของเครื่องที่ต้องการปลุก',
      ok: 'ยืนยัน'
    },
    download: {
      title: 'ดาวโหลด Disk Image',
      input: 'กรุณาใส่ URL ของอิมเมจระยะไกล',
      ok: 'ยืนยัน',
      diskShared: 'ปิดดิสก์เสมือนก่อน แล้วจึงใช้การดาวน์โหลดอิมเมจ',
      mountedImage: 'อิมเมจนี้ถูกเมานต์อยู่ โปรดยกเลิกการเมานต์ก่อนอัปโหลดไฟล์ที่มีชื่อเดียวกัน',
      diskOff: 'ปิดดิสก์เสมือน',
      uploadbox: 'วางไฟล์ที่นี่หรือคลิกเพื่อเลือก',
      inputfile: 'กรุณากรอกไฟล์ภาพ',
      NoISO: 'ไม่มี ISO',
      sha256Placeholder: 'ป้อน checksum SHA-256 64 ตัวอักษร',
      invalidSHA256: 'SHA-256 ต้องเป็นสตริงเลขฐานสิบหก 64 ตัวอักษร',
      checksumFailed: 'ดาวน์โหลดล้มเหลว: การตรวจสอบ SHA-256 ล้มเหลว'
    },
    power: {
      title: 'เปิด/ปิด',
      showConfirm: 'การยืนยัน',
      showConfirmTip: 'การทำงานของระบบไฟฟ้าต้องมีการยืนยันเพิ่มเติม',
      reset: 'รีเช็ท',
      resetConfirm: 'ดำเนินการรีเซ็ตต่อไปหรือไม่',
      powerConfirm: 'ดำเนินการจ่ายไฟต่อหรือไม่',
      okBtn: 'ใช่',
      cancelBtn: 'ไม่ใช่'
    },
    settings: {
      title: 'การตั้งค่า',
      about: {
        information: 'ข้อมูล',
        ip: 'IP',
        mdns: 'mDNS',
        applicationTip: 'เวอร์ชั่นเว็บ NanoKVM',
        image: 'เวอร์ชั่น Image ระบบ',
        imageTip: 'เวอร์ชั่น Image ระบบ NanoKVM',
        community: 'ชุมชน',
        hostname: 'ชื่อโฮสต์',
        hostnameUpdated: 'อัปเดตชื่อโฮสต์แล้ว รีบูตเพื่อใช้',
        ipType: {}
      },
      appearance: {
        title: 'ลักษณะการแสดงผล',
        display: 'การแสดงผล',
        language: 'ภาษา',
        languageDesc: 'เลือกภาษาสำหรับอินเทอร์เฟซ',
        webTitle: 'ชื่อเว็บ',
        webTitleDesc: 'ปรับแต่งชื่อหน้าเว็บ',
        menuBar: {
          title: 'แถบเมนู',
          mode: 'โหมดการแสดงผล',
          modeDesc: 'แสดงแถบเมนูบนหน้าจอ',
          modeOff: 'ปิด',
          modeAuto: 'ซ่อนอัตโนมัติ',
          modeAlways: 'มองเห็นได้เสมอ',
          keyboardLedStatus: 'ตัวบ่งชี้ปุ่มล็อกแป้นพิมพ์',
          keyboardLedStatusDesc:
            'แสดงสถานะ Num Lock, Caps Lock และ Scroll Lock ของคอมพิวเตอร์ระยะไกล',
          icons: 'ไอคอนเมนูย่อย',
          iconsDesc: 'แสดงไอคอนเมนูย่อยในแถบเมนู'
        }
      },
      keyboardLedStatus: {
        groupLabel: 'สถานะปุ่มล็อกแป้นพิมพ์ระยะไกล',
        indicatorLabel: '{{label}}: {{state}}',
        numLock: 'Num Lock',
        numLockShort: 'Num',
        capsLock: 'Caps Lock',
        capsLockShort: 'Caps',
        scrollLock: 'Scroll Lock',
        scrollLockShort: 'Scr',
        on: 'เปิด',
        off: 'ปิด',
        unknown: 'ไม่ทราบ'
      },
      device: {
        title: 'อุปกรณ์',
        oled: {
          title: 'OLED',
          description: 'เวลาก่อนจอ OLED จะปิดอัตโนมัติ'
        },
        ssh: {
          description: 'เปิดใช้งาน SSH'
        },
        swap: {
          title: 'สลับ',
          description: 'กำหนดขนาดไฟล์สลับ'
        },
        mouseJiggler: {
          title: 'เมาส์กระตุก',
          description: 'ป้องกันไม่ให้โฮสต์ระยะไกลเข้าสู่โหมดสลีป',
          disable: 'ปิดการใช้งาน',
          absolute: 'โหมดสัมบูรณ์',
          relative: 'โหมดสัมพัทธ์'
        },
        mdns: {
          description: 'เปิดใช้งานบริการค้นหา mDNS',
          tip: 'ปิดเครื่องหากไม่จำเป็น'
        },
        hdmi: {
          description: 'เปิดใช้งาน HDMI/เอาต์พุตมอนิเตอร์',
          idleTimeoutTitle: 'หมดเวลาการจับภาพเมื่อไม่มีการใช้งาน',
          idleTimeoutDescription: 'หยุดการจับภาพ HDMI เมื่อไม่มีผู้ชมที่ใช้งานอยู่เป็นเวลา'
        },
        hidOnly: 'HID-โหมดเท่านั้น',
        disk: 'ดิสก์จำลอง',
        network: 'เครือข่ายจำลอง',
        networkDesc: 'เปิดใช้งานอุปกรณ์เครือข่ายจำลอง',
        reboot: 'รีบูต',
        rebootDesc: 'คุณแน่ใจหรือไม่ว่าต้องการรีบูต NanoKVM'
      },
      network: {
        title: 'เครือข่าย',
        wifi: {
          title: 'Wi-Fi',
          description: 'ตั้งค่า Wi-Fi',
          apMode: 'เปิดใช้งานโหมด AP แล้ว ให้เชื่อมต่อ Wi-Fi โดยสแกนรหัส QR',
          connect: 'เชื่อมต่อ Wi-Fi',
          connectDesc1: 'กรุณาใส่ SSID และรหัสผ่านของเครือข่าย',
          disconnect: 'คุณแน่ใจหรือไม่ว่าต้องการตัดการเชื่อมต่อเครือข่าย?',
          ssid: 'ชื่อ',
          password: 'รหัสผ่าน',
          joinBtn: 'เข้าร่วม',
          cancelBtn: 'ยกเลิก'
        },
        tls: {
          description: 'เปิดใช้งานโปรโตคอล HTTPS',
          tip: 'โปรดทราบ: การใช้ HTTPS อาจเพิ่มความหน่วง โดยเฉพาะในโหมดวิดีโอ MJPEG'
        },
        dns: {
          title: 'DNS',
          description: 'ตั้งค่าเซิร์ฟเวอร์ DNS สำหรับ NanoKVM',
          ipv4Title: 'IPv4',
          ipv4Description: 'กำหนดค่าที่อยู่ IPv4 สำหรับอินเทอร์เฟซแบบมีสาย',
          dhcp: 'DHCP',
          manual: 'กำหนดเอง',
          apply: 'นำไปใช้',
          invalid: 'ป้อนที่อยู่ IPv4 หรือ IPv6 ที่ถูกต้อง',
          invalidNetwork: 'ป้อนที่อยู่ IPv4 ซับเน็ตมาสก์ และเราเตอร์ที่ถูกต้อง',
          saved: 'บันทึกการตั้งค่า DNS แล้ว',
          redirecting: 'บันทึกการตั้งค่าเครือข่ายแล้ว กำลังเปิดที่อยู่ใหม่...',
          saveFailed: 'บันทึกการตั้งค่า DNS ไม่สำเร็จ',
          unsaved: 'มีการเปลี่ยนแปลงที่ยังไม่ได้บันทึก',
          maxServers: 'อนุญาตเซิร์ฟเวอร์ DNS ได้สูงสุด {{count}} รายการ',
          dhcpServersDescription: 'เซิร์ฟเวอร์ DNS จะได้รับจาก DHCP โดยอัตโนมัติ',
          interface: 'อินเทอร์เฟซ',
          ipAddress: 'ที่อยู่ IP',
          subnetMask: 'ซับเน็ตมาสก์',
          router: 'เราเตอร์'
        }
      },
      tailscale: {
        title: 'Tailscale',
        memory: {
          title: 'การปรับแต่งหน่วยความจำ',
          tip: 'เมื่อการใช้งานหน่วยความจำเกินขีดจำกัด การเก็บขยะจะทำงานอย่างเข้มงวดมากขึ้นเพื่อพยายามปล่อยหน่วยความจำ คำแนะนำคือการตั้งค่าเป็น 50MB หากใช้ Tailscale และต้องทำการรีสตาร์ท Tailscale เพื่อให้การเปลี่ยนแปลงมีผล'
        },
        swap: {
          title: 'สลับหน่วยความจำ',
          tip: 'หากปัญหายังคงมีอยู่หลังจากเปิดใช้งานการเพิ่มประสิทธิภาพหน่วยความจำ ให้ลองเปิดใช้งานหน่วยความจำสลับ นี่เป็นการตั้งค่าขนาดไฟล์สลับเป็น 256MB ตามค่าเริ่มต้น ซึ่งสามารถปรับได้ใน "การตั้งค่า > อุปกรณ์"'
        },
        restart: 'คุณแน่ใจที่จะรีสตาร์ท Tailscale หรือไม่?',
        stop: 'คุณแน่ใจที่จะปิด Tailscale หรือไม่?',
        loading: 'กำลังโหลด...',
        install: 'ติดตั้ง',
        installing: 'กำลังติดตั้ง',
        failed: 'การติดตั้งล้มเหลว',
        download: 'ดาวน์โหลด',
        package: 'แพ็กเกจการติดตั้ง',
        unzip: 'และแตกไฟล์',
        upTailscale: 'อัปโหลด tailscale ไปยังไดเรกทอรี /usr/bin/ ของ NanoKVM',
        upTailscaled: 'อัปโหลด tailscaled ไปยังไดเรกทอรี /usr/sbin/ ของ NanoKVM',
        refresh: 'รีเฟรชหน้าปัจจุบัน',
        notRunning: 'Tailscale ไม่ทำงาน กรุณาเริ่มต้นเพื่อดำเนินการต่อ',
        run: 'เริ่ม',
        notLogin: 'อุปกรณ์ยังไม่ได้ผูกบัญชี กรุณาล็อกอินและผูกอุปกรณ์นี้กับบัญชีของคุณ',
        urlPeriod: 'ลิงก์นี้ใช้ได้ 10 นาที',
        login: 'ล็อกอิน',
        loginSuccess: 'ล็อกอินสำเร็จ',
        deviceName: 'ชื่ออุปกรณ์',
        deviceIP: 'IP อุปกรณ์',
        account: 'บัญชีผู้ใช้',
        logout: 'ออกจากระบบ',
        logoutDesc: 'คุณแน่ใจที่จะออกจากระบบหรือไม่?',
        uninstall: 'ถอนการติดตั้ง Tailscale',
        uninstallDesc: 'คุณแน่ใจหรือไม่ว่าต้องการถอนการติดตั้ง Tailscale',
        okBtn: 'ใช่',
        cancelBtn: 'ไม่ใช่'
      },
      update: {
        title: 'ตรวจสอบการอัปเดต',
        queryFailed: 'ไม่สามารถรับข้อมูลเวอร์ชันได้',
        updateFailed: 'การอัปเดตล้มเหลว กรุณาลองใหม่',
        isLatest: 'คุณมีเวอร์ชันล่าสุดแล้ว',
        available: 'มีการอัปเดตใหม่ คุณแน่ใจที่จะอัปเดตหรือไม่?',
        updating: 'กำลังเริ่มอัปเดต กรุณารอสักครู่...',
        confirm: 'ยืนยัน',
        cancel: 'ยกเลิก',
        preview: 'ดูตัวอย่างการอัปเดต',
        offline: {
          title: 'อัปเดตออฟไลน์',
          desc: 'อัปเดตผ่านแพ็คเกจการติดตั้งในเครื่อง',
          upload: 'อัปโหลด',
          invalidName: 'รูปแบบชื่อไฟล์ไม่ถูกต้อง กรุณาดาวน์โหลดจากรุ่น GitHub',
          updateFailed: 'การอัปเดตล้มเหลว กรุณาลองใหม่'
        }
      },
      account: {
        title: 'บัญชี',
        webAccount: 'ชื่อผู้ใช้',
        password: 'รหัสผ่าน',
        updateBtn: 'ยืนยัน',
        logoutBtn: 'ออกจากระบบ',
        logoutDesc: 'คุณแน่ใจที่จะออกจากระบบหรือไม่?',
        okBtn: 'ใช่',
        cancelBtn: 'ไม่ใช่'
      }
    },
    picoclaw: {
      title: 'PicoClaw ผู้ช่วย',
      empty: 'เปิดแผงควบคุมและเริ่มงานเพื่อเริ่มต้น',
      inputPlaceholder: 'อธิบายสิ่งที่คุณต้องการให้ PicoClaw ทำ',
      newConversation: 'บทสนทนาใหม่',
      processing: 'กำลังประมวลผล...',
      agent: {
        defaultTitle: 'ผู้ช่วยทั่วไป',
        defaultDescription: 'แชททั่วไป การค้นหา และพื้นที่ช่วยเหลือ',
        kvmTitle: 'การควบคุมระยะไกล',
        kvmDescription: 'ใช้งานโฮสต์ระยะไกลผ่าน NanoKVM',
        switched: 'เปลี่ยนบทบาทตัวแทนแล้ว',
        switchFailed: 'ไม่สามารถเปลี่ยนบทบาทตัวแทนได้'
      },
      send: 'ส่ง',
      cancel: 'ยกเลิก',
      status: {
        connecting: 'กำลังเชื่อมต่อกับเกตเวย์...',
        connected: 'เชื่อมต่อเซสชัน PicoClaw แล้ว',
        disconnected: 'ตัดการเชื่อมต่อเซสชัน PicoClaw แล้ว',
        stopped: 'ส่งคำขอหยุดแล้ว',
        runtimeStarted: 'เริ่ม Runtime PicoClaw แล้ว',
        runtimeStartFailed: 'ไม่สามารถเริ่ม Runtime PicoClaw ได้',
        runtimeStopped: 'หยุด Runtime PicoClaw แล้ว',
        runtimeStopFailed: 'ไม่สามารถหยุด Runtime PicoClaw ได้'
      },
      connection: {
        runtime: {
          checking: 'กำลังตรวจสอบ',
          ready: 'Runtime พร้อมใช้งาน',
          stopped: 'หยุด Runtime แล้ว',
          unavailable: 'Runtime ไม่พร้อมใช้งาน',
          configError: 'ข้อผิดพลาดในการกำหนดค่า'
        },
        transport: {
          connecting: 'กำลังเชื่อมต่อ',
          connected: 'เชื่อมต่อแล้ว'
        },
        run: {
          idle: 'ไม่ได้ใช้งาน',
          busy: 'ไม่ว่าง'
        }
      },
      message: {
        toolAction: 'การกระทำ',
        observation: 'การสังเกต',
        screenshot: 'ภาพหน้าจอ'
      },
      overlay: {
        locked: 'PicoClaw กำลังควบคุมอุปกรณ์ การป้อนข้อมูลด้วยตนเองถูกหยุดชั่วคราว'
      },
      install: {
        install: 'ติดตั้ง PicoClaw',
        installing: 'กำลังติดตั้ง PicoClaw',
        success: 'PicoClaw ติดตั้งสำเร็จแล้ว',
        failed: 'ไม่สามารถติดตั้ง PicoClaw',
        uninstalling: 'กำลังถอนการติดตั้ง Runtime...',
        uninstalled: 'ถอนการติดตั้ง Runtime สำเร็จแล้ว',
        uninstallFailed: 'การถอนการติดตั้งล้มเหลว',
        requiredTitle: 'PicoClaw ไม่ได้ติดตั้ง',
        requiredDescription: 'ติดตั้ง PicoClaw ก่อนที่จะเริ่ม Runtime PicoClaw',
        progressDescription: 'PicoClaw กำลังดาวน์โหลดและติดตั้ง',
        stages: {
          preparing: 'กำลังเตรียมการ',
          downloading: 'กำลังดาวน์โหลด',
          extracting: 'กำลังแตกไฟล์',
          verifying: 'กำลังตรวจสอบ',
          installing: 'กำลังติดตั้ง',
          installed: 'ติดตั้งแล้ว',
          install_timeout: 'หมดเวลา',
          install_failed: 'ล้มเหลว'
        }
      },
      model: {
        requiredTitle: 'จำเป็นต้องมีการกำหนดค่าโมเดล',
        requiredDescription: 'กำหนดค่าโมเดล PicoClaw ก่อนใช้แชท PicoClaw',
        docsTitle: 'คู่มือการกำหนดค่า',
        docsDesc: 'รุ่นและโปรโตคอลที่รองรับ',
        menuLabel: 'กำหนดค่าโมเดล',
        modelIdentifier: 'ตัวระบุรุ่น',
        modelIdentifierPlaceholder: 'openai/gpt-5.4',
        apiBase: 'API Base URL',
        apiBasePlaceholder: 'https://api.example.com/v1',
        apiKey: 'คีย์ API',
        apiKeyPlaceholder: 'ป้อนคีย์ API ของโมเดล',
        save: 'บันทึก',
        saving: 'กำลังบันทึก',
        saved: 'บันทึกการกำหนดค่าโมเดลแล้ว',
        saveFailed: 'ไม่สามารถบันทึกการกำหนดค่าโมเดลได้',
        invalid: 'ต้องระบุรหัสโมเดล, API Base URL และคีย์ API'
      },
      uninstall: {
        menuLabel: 'ถอนการติดตั้ง',
        confirmTitle: 'ถอนการติดตั้ง PicoClaw',
        confirmContent:
          'คุณแน่ใจหรือไม่ว่าต้องการถอนการติดตั้ง PicoClaw การดำเนินการนี้จะลบไฟล์ปฏิบัติการและไฟล์การกำหนดค่าทั้งหมด',
        confirmOk: 'ถอนการติดตั้ง'
      },
      history: {
        title: 'ประวัติ',
        loading: 'กำลังโหลดเซสชัน...',
        emptyTitle: 'ยังไม่มีประวัติ',
        emptyDescription: 'เซสชัน PicoClaw ก่อนหน้าจะปรากฏที่นี่',
        loadFailed: 'ไม่สามารถโหลดประวัติเซสชันได้',
        deleteFailed: 'ไม่สามารถลบเซสชันได้',
        deleteConfirmTitle: 'ลบเซสชัน',
        deleteConfirmContent: 'คุณแน่ใจหรือไม่ว่าต้องการลบ "{{title}}"',
        deleteConfirmOk: 'ลบ',
        messageCount_one: '{{count}} ข้อความ',
        messageCount_other: '{{count}} ข้อความ'
      },
      config: {
        startRuntime: 'เริ่ม PicoClaw',
        stopRuntime: 'หยุด PicoClaw'
      },
      start: {
        title: 'เริ่ม PicoClaw',
        description: 'เริ่ม Runtime เพื่อเริ่มใช้ผู้ช่วย PicoClaw'
      }
    },
    error: {
      title: 'เราเจอปัญหา',
      refresh: 'รีเฟรช'
    },
    fullscreen: {
      toggle: 'โหมดเต็มหน้าจอ'
    },
    menu: {
      collapse: 'ย่อเมนู'
    }
  }
};

export default th;
