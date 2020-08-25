export class Constants{

    static readonly JOYPAD                = 0xFF00;
    static readonly SERIAL_DATA           = 0xFF01;
    static readonly SERIAL_CTRL           = 0xFF02;
    static readonly DIV_CNTR              = 0xFF04;
    static readonly TIMER_COUNT           = 0xFF05;
    static readonly TIMER_RELOAD          = 0xFF06;
    static readonly TIMER_CRTL            = 0xFF07;
    static readonly INT_FLAG              = 0xFF0F;

    static readonly SND_1_ENT             = 0xFF10;
    static readonly SND_1_WAV_LEN         = 0xFF11;
    static readonly SND_1_ENV             = 0xFF12;
    static readonly SND_1_FREQ_KICK_LOWER = 0xFF13;
    static readonly SND_1_FREQ_KICK_UPPER = 0xFF14;
    static readonly SND_2_WAVE_LEN        = 0xFF16;
    static readonly SND_2_ENV             = 0xFF17;
    static readonly SND_2_FREQ_KICK_LOWER = 0xFF18;
    static readonly SND_2_FREQ_KICK_UPPER = 0xFF19;
    static readonly SND_3_ON_OFF          = 0xFF1A;
    static readonly SND_3_LEN             = 0xFF1B;
    static readonly SND_3_VOLUME          = 0xFF1C;
    static readonly SND_3_FREQ_KICK_LOWER = 0xFF1D;
    static readonly SND_3_FREQ_KICK_UPPER = 0xFF1E;

    static readonly SND_4_LEN             = 0xFF20;
    static readonly SND_4_ENV             = 0xFF21;
    static readonly SND_4_POLY_KICK_LOWER = 0xFF22;
    static readonly SND_4_POLY_KICK_UPPER = 0xFF23;
    static readonly SND_VOICE_INP         = 0xFF24;
    static readonly SND_STEREO            = 0xFF25;
    static readonly SND_STAT              = 0xFF26;

    static readonly SND_BNK_10            = 0xFF30;
    static readonly SND_BNK_11            = 0xFF31;
    static readonly SND_BNK_12            = 0xFF32;
    static readonly SND_BNK_13            = 0xFF33;
    static readonly SND_BNK_14            = 0xFF34;
    static readonly SND_BNK_15            = 0xFF35;
    static readonly SND_BNK_16            = 0xFF36;
    static readonly SND_BNK_17            = 0xFF37;
    static readonly SND_BNK_20            = 0xFF38;
    static readonly SND_BNK_21            = 0xFF39;
    static readonly SND_BNK_22            = 0xFF3A;
    static readonly SND_BNK_23            = 0xFF3B;
    static readonly SND_BNK_24            = 0xFF3C;
    static readonly SND_BNK_25            = 0xFF3D;
    static readonly SND_BNK_26            = 0xFF3E;
    static readonly SND_BNK_27            = 0xFF3F;

    static readonly LCD_CTRL              = 0xFF40;
    static readonly LCD_STAT              = 0xFF41;
    static readonly LCD_SCROLL_Y          = 0xFF42;
    static readonly LCD_SCROLL_X          = 0xFF43;
    static readonly LCD_Y_LOC             = 0xFF44;
    static readonly LCD_Y_COMP            = 0xFF45;
    static readonly LCD_DMA               = 0xFF46;
    static readonly LCD_BACK_PALETTE      = 0xFF47;
    static readonly LCD_SPR0_PALETTE      = 0xFF48;
    static readonly LCD_SPR1_PALETTE      = 0xFF49;
    static readonly LCD_WIN_Y             = 0xFF4A;
    static readonly LCD_WIN_X             = 0xFF4B;
    static readonly CPU_SPEED_REG         = 0xFF4D;
    static readonly VRAM_BANK             = 0xFF4F;

    static readonly DMA_SRC_UPPER         = 0xFF51;
    static readonly DMA_SRC_LOWER         = 0xFF52;
    static readonly DMA_DST_UPPER         = 0xFF53;
    static readonly DMA_DST_LOWER         = 0xFF54;
    static readonly DMA_LEN_TYPE          = 0xFF55; 
    static readonly IR_PORT               = 0xFF56; 

    static readonly BGP_INDEX             = 0xFF68; 
    static readonly BGP_DATA              = 0xFF69; 
    static readonly OBP_INDEX             = 0xFF6A; 
    static readonly OBP_DATA              = 0xFF6B; 

    static readonly RAM_BANK              = 0xFF70; 
    static readonly INT_ENABLE            = 0xFFFF;                                    

    static readonly INSTR_HBLANK          = 60;
    static readonly INSTR_VBLANK          = 90000;
    static readonly INSTR_TIMA            = 6000;
    static readonly INSTR_DIV             = 33;

    // Tiempos en ciclos
    static readonly CYCLES_DIV            = 256;
    static readonly CYCLES_TIMER_MODE0    = 1024;
    static readonly CYCLES_TIMER_MODE1    = 16;
    static readonly CYCLES_TIMER_MODE2    = 64;
    static readonly CYCLES_TIMER_MODE3    = 256;
    static readonly CYCLES_LCD_MODE0      = 375; // 376 / 375
    static readonly CYCLES_LCD_MODE1      = 456;
    static readonly CYCLES_LCD_MODE2      = 82; // 80 / 82
    static readonly CYCLES_LCD_MODE3      = 172;

    static readonly INT_VBLANK            = 0x01;
    static readonly INT_LCDC              = 0x02;
    static readonly INT_TIMER             = 0x04;
    static readonly INT_SERIALTX          = 0x08;
    static readonly INT_KEY               = 0x10;

    static readonly KEY_DOWN              = 0;
    static readonly KEY_UP                = 1;
    static readonly KEY_LEFT              = 2;
    static readonly KEY_RIGHT             = 3;
    static readonly KEY_START             = 4;
    static readonly KEY_SELECT            = 5;
    static readonly KEY_B                 = 6;
    static readonly KEY_A                 = 7;

    static readonly CPU_SPEED             = 4.194304; // MHz
    static readonly MEMSIZE               = 65536; // Bytes

    static readonly DMG_COLORS = [0x9BBC0F, 0x8BAC0F, 0x306230, 0x0F380F];
    static readonly DMG_COLORS_BW = [0xE6E6E6, 0xA0A0A0, 0x505050, 0x141414]; // [230, 160, 80, 20];
    static readonly SCREEN_WIDTH = 160;
    static readonly SCREEN_HEIGHT = 144;

}