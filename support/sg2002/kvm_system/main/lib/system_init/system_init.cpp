#include "config.h"
#include "system_init.h"

using namespace maix;
using namespace maix::sys;

extern kvm_sys_state_t kvm_sys_state;
extern kvm_oled_state_t kvm_oled_state;

uint8_t get_hdmi_version()
{
	FILE *fp;
	uint8_t RW_Data[2];
    system("/kvmapp/system/init.d/S15kvmhwd get_hdmi_version");
	if(access("/etc/kvm/hdmi_version", F_OK) == 0){
        fp = fopen("/etc/kvm/hdmi_version", "r");
        fread(RW_Data, sizeof(char), 2, fp);
        fclose(fp);
        if(RW_Data[0] == 'u'){
            // 6911uxc / 6911uxe
            if(RW_Data[1] == 'e'){
                return 2;
            } else if(RW_Data[1] == 'x') {
                return 1;
            } else {
                return 1;
            }
        } else if(RW_Data[0] == 'd'){
            // 6911d
            return 3;
        } else {
            // 6911c
            return 0;
        }
    } else {
		return 0;
    }
}

void Production_testing_patch(void)
{	
	// Product UE version detecte
	if(get_hdmi_version() == 2){
		printf("ue_patch_state = 1;\n");
		kvm_oled_state.ue_patch_state = 1;
	} else {
		printf("ue_patch_state = 0;\n");
		kvm_oled_state.ue_patch_state = 0;
	}

	// New products default to disabling mDNS functionality
	system("rm -f /etc/init.d/S50ssdpd");
	system("sync");
}

void new_app_init(void)
{
	printf("legacy kvm_new_app marker ignored by kvm_system; S95nanokvm owns app migration\n");
	system("rm -f /kvmapp/kvm_new_app");
}

void build_complete_resolv(void)
{
	// DNS is owned by the Rust network API and init scripts. The legacy helper
	// used to overwrite resolv.conf with public defaults on new images, which
	// could break private lab DNS and static network settings.
}

void new_img_init(void)
{
	build_complete_resolv();
	system("rm -f /kvmapp/kvm_new_img");
}
