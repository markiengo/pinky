import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function normalizeVietnamese(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}

function slugify(str: string): string {
  return normalizeVietnamese(str)
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
}

// ─── Types ──────────────────────────────────────────────────────────
interface QuestionData {
  type: "mcq" | "essay";
  content: string;
  options?: string[];
  correctAnswer: string;
  orderIndex: number;
}

interface DeThiData {
  title: string;
  source: string;
  tags: string[];
  questions: QuestionData[];
}

interface SubjectData {
  slug: string;
  name: string;
  deThi: DeThiData[];
}

// ─── Seed Data ──────────────────────────────────────────────────────
const SEED_DATA: SubjectData[] = [
  // ── Kế toán (Accounting) ──────────────────────────────────────────
  {
    slug: "ke_toan",
    name: "Kế toán",
    deThi: [
      {
        title: "Đề thi Nguyên lý Kế toán – FTU",
        source: "Đại học Ngoại thương",
        tags: ["tong_quan_ke_toan", "tai_khoan_ghi_s kep", "nguyen_tac_ke_toan", "dinh_khoan", "bang_can_doi_ke_toan"],
        questions: [
          {
            type: "mcq",
            content: "Theo Luật Kế toán Việt Nam, 'kế toán' là gì?",
            options: [
              "Một hệ thống thông tin kinh tế, thu thập xử lý và cung cấp thông tin về tài sản, nguồn vốn và sự vận động của chúng",
              "Một phương pháp quản lý doanh nghiệp bằng con số",
              "Một công cụ ghi chép sổ sách thủ công",
              "Một hình thức kiểm toán nội bộ",
            ],
            correctAnswer: "Một hệ thống thông tin kinh tế, thu thập xử lý và cung cấp thông tin về tài sản, nguồn vốn và sự vận động của chúng",
            orderIndex: 0,
          },
          {
            type: "mcq",
            content: "Tài sản của doanh nghiệp là:",
            options: [
              "Tổng số tiền mặt doanh nghiệp đang có",
              "Toàn bộ nguồn lực do doanh nghiệp kiểm soát và sử dụng cho mục đích kinh doanh",
              "Tổng doanh thu trong một kỳ kế toán",
              "Lợi nhuận sau thuế của doanh nghiệp",
            ],
            correctAnswer: "Toàn bộ nguồn lực do doanh nghiệp kiểm soát và sử dụng cho mục đích kinh doanh",
            orderIndex: 1,
          },
          {
            type: "mcq",
            content: "Nguyên tắc phù hợp yêu cầu:",
            options: [
              "Tài sản phải được phản ánh phù hợp với nguồn hình thành tài sản",
              "Chi phí phải được phản ánh trên báo cáo thu nhập trong kỳ kế toán tương ứng với doanh thu",
              "Cả hai yêu cầu trên",
              "Chỉ phản ánh chi phí khi có dòng tiền thực tế",
            ],
            correctAnswer: "Chi phí phải được phản ánh trên báo cáo thu nhập trong kỳ kế toán tương ứng với doanh thu",
            orderIndex: 2,
          },
          {
            type: "mcq",
            content: "Phát biểu nào sau đây về nguyên tắc trọng yếu là đúng?",
            options: [
              "Mọi nghiệp vụ kinh tế đều phải ghi nhận chi tiết regardless of giá trị",
              "Cho phép sự sai sót có thể chấp nhận được khi nó không làm ảnh hưởng lớn đến báo cáo tài chính",
              "Nguyên tắc trọng yếu chỉ áp dụng cho doanh nghiệp lớn",
              "Không cho phép bỏ qua bất kỳ nguyên tắc kế toán nào",
            ],
            correctAnswer: "Cho phép sự sai sót có thể chấp nhận được khi nó không làm ảnh hưởng lớn đến báo cáo tài chính",
            orderIndex: 3,
          },
          {
            type: "mcq",
            content: "Định khoản nghiệp vụ: Mua TSCĐ 50 triệu đồng chưa thanh toán. Định khoản đúng là:",
            options: [
              "Nợ TK 211 / Có TK 331: 50 triệu",
              "Nợ TK 331 / Có TK 211: 50 triệu",
              "Nợ TK 111 / Có TK 211: 50 triệu",
              "Nợ TK 211 / Có TK 111: 50 triệu",
            ],
            correctAnswer: "Nợ TK 211 / Có TK 331: 50 triệu",
            orderIndex: 4,
          },
          {
            type: "mcq",
            content: "Tài khoản là:",
            options: [
              "Một sổ ghi chép dòng tiền",
              "Một phương pháp kế toán để phân loại và theo dõi sự biến động của các đối tượng kế toán",
              "Một chứng từ kế toán bắt buộc",
              "Một báo cáo tài chính nội bộ",
            ],
            correctAnswer: "Một phương pháp kế toán để phân loại và theo dõi sự biến động của các đối tượng kế toán",
            orderIndex: 5,
          },
          {
            type: "mcq",
            content: "Nguyên tắc ghi chép trên tài khoản tài sản:",
            options: [
              "Tăng ghi Nợ, giảm ghi Có",
              "Tăng ghi Có, giảm ghi Nợ",
              "Tăng ghi Nợ, giảm ghi Nợ",
              "Tăng ghi Có, giảm ghi Có",
            ],
            correctAnswer: "Tăng ghi Nợ, giảm ghi Có",
            orderIndex: 6,
          },
          {
            type: "mcq",
            content: "Bảng cân đối kế toán phản ánh:",
            options: [
              "Tình hình tài sản, nợ phải trả và vốn chủ sở hữu của doanh nghiệp tại một thời điểm nhất định",
              "Kết quả hoạt động kinh doanh trong một kỳ kế toán",
              "Dòng tiền thu vào và chi ra trong kỳ",
              "Chi phí và doanh thu trong một tháng",
            ],
            correctAnswer: "Tình hình tài sản, nợ phải trả và vốn chủ sở hữu của doanh nghiệp tại một thời điểm nhất định",
            orderIndex: 7,
          },
          {
            type: "essay",
            content: "Định khoản các nghiệp vụ kinh tế phát sinh sau:\n\n1. Rút tiền gửi ngân hàng về quỹ tiền mặt: 10.000.000đ\n2. Mua nguyên vật liệu nhập kho, giá chưa thuế 20.000.000đ, thuế GTGT 10%, thanh toán bằng chuyển khoản\n3. Chi tiền mặt tạm ứng cho nhân viên đi mua hàng: 5.000.000đ",
            correctAnswer: "**Nghiệp vụ 1:**\n- Nợ TK 111 (Tiền mặt): 10.000.000đ\n- Có TK 112 (Tiền gửi ngân hàng): 10.000.000đ\n\n**Nghiệp vụ 2:**\n- Nợ TK 152 (Nguyên vật liệu): 20.000.000đ\n- Nợ TK 1331 (Thuế GTGT được khấu trừ): 2.000.000đ\n- Có TK 112 (Tiền gửi ngân hàng): 22.000.000đ\n\n**Nghiệp vụ 3:**\n- Nợ TK 141 (Tạm ứng): 5.000.000đ\n- Có TK 111 (Tiền mặt): 5.000.000đ",
            orderIndex: 8,
          },
          {
            type: "essay",
            content: "Trình bày các bước trong chu trình kế toán và giải thích vai trò của từng bước.",
            correctAnswer: "Chu trình kế toán gồm các bước:\n\n1. **Lập chứng từ** — Ghi nhận nghiệp vụ kinh tế phát sinh\n2. **Ghi sổ nhật ký** — Ghi chép theo trình tự thời gian\n3. **Ghi sổ cái** — Phân loại theo tài khoản\n4. **Lập bảng cân đối số phát sinh** — Kiểm tra tính chính xác\n5. **Lập báo cáo tài chính** — Bảng cân đối kế toán, Báo cáo kết quả hoạt động kinh doanh\n6. **Khóa sổ kế toán** — Chốt số dư cuối kỳ, chuyển sang kỳ sau",
            orderIndex: 9,
          },
        ],
      },
      {
        title: "Đề thi Kế toán Tài chính – NEU",
        source: "Đại học Kinh tế Quốc dân",
        tags: ["ke_toan_tai_chinh", "bao_cao_tai_chinh", "tai_san_no_phai_tra", "von_chu_so_huu", "chi_phi_doanh_thu"],
        questions: [
          {
            type: "mcq",
            content: "Báo cáo lưu chuyển tiền tệ được lập theo phương pháp nào?",
            options: [
              "Phương pháp trực tiếp hoặc gián tiếp",
              "Chỉ phương pháp trực tiếp",
              "Chỉ phương pháp gián tiếp",
              "Phương pháp dồn tích",
            ],
            correctAnswer: "Phương pháp trực tiếp hoặc gián tiếp",
            orderIndex: 0,
          },
          {
            type: "mcq",
            content: "Tài sản cố định hữu hình được trích khấu hao theo phương pháp nào phổ biến nhất?",
            options: [
              "Khấu hao đường thẳng",
              "Khấu hao theo số lượng sản phẩm",
              "Khấu hao giảm dần",
              "Không khấu hao",
            ],
            correctAnswer: "Khấu hao đường thẳng",
            orderIndex: 1,
          },
          {
            type: "mcq",
            content: "Vốn chủ sở hữu bao gồm:",
            options: [
              "Vốn góp của chủ sở hữu + Lợi nhuận chưa phân phối + Các quỹ",
              "Vay ngắn hạn + Vay dài hạn",
              "Phải trả người bán + Phải trả người lao động",
              "Thuế phải nộp nhà nước + Phải trả khác",
            ],
            correctAnswer: "Vốn góp của chủ sở hữu + Lợi nhuận chưa phân phối + Các quỹ",
            orderIndex: 2,
          },
          {
            type: "mcq",
            content: "Doanh thu được ghi nhận khi nào theo nguyên tắc dồn tích?",
            options: [
              "Khi nhận được tiền từ khách hàng",
              "Khi hàng hóa đã được giao hoặc dịch vụ đã cung cấp và có thể xác định được khoản doanh thu",
              "Khi ký hợp đồng với khách hàng",
              "Khi hóa đơn được xuất ra",
            ],
            correctAnswer: "Khi hàng hóa đã được giao hoặc dịch vụ đã cung cấp và có thể xác định được khoản doanh thu",
            orderIndex: 3,
          },
          {
            type: "mcq",
            content: "Phải thu khách hàng thuộc loại tài sản nào?",
            options: [
              "Tài sản ngắn hạn — khoản phải thu",
              "Tài sản dài hạn — khoản phải thu",
              "Nợ phải trả ngắn hạn",
              "Vốn chủ sở hữu",
            ],
            correctAnswer: "Tài sản ngắn hạn — khoản phải thu",
            orderIndex: 4,
          },
          {
            type: "essay",
            content: "Một doanh nghiệp có số liệu sau (đvt: triệu đồng):\n- Tiền mặt: 50\n- Tiền gửi ngân hàng: 200\n- Hàng tồn kho: 100\n- TSCĐ hữu hình: 500\n- Phải thu khách hàng: 80\n- Phải trả người bán: 120\n- Vay ngắn hạn: 150\n- Vốn góp: 500\n- Lợi nhuận chưa phân phối: 160\n\nYêu cầu: Lập Bảng cân đối kế toán.",
            correctAnswer: "**Bảng cân đối kế toán**\n\n| TÀI SẢN | Số tiền | NGUỒN VỐN | Số tiền |\n|---------|---------|-----------|---------|\n| A. Tài sản ngắn hạn | 430 | A. Nợ phải trả | 270 |\n|  Tiền mặt | 50 |  Phải trả người bán | 120 |\n|  Tiền gửi NH | 200 |  Vay ngắn hạn | 150 |\n|  Phải thu KH | 80 | | |\n|  Hàng tồn kho | 100 | B. Vốn chủ sở hữu | 660 |\n| B. Tài sản dài hạn | 500 |  Vốn góp | 500 |\n|  TSCĐ hữu hình | 500 |  Lợi nhuận KPT | 160 |\n| **Tổng tài sản** | **930** | **Tổng nguồn vốn** | **930** |",
            orderIndex: 5,
          },
        ],
      },
      {
        title: "Đề thi Kế toán Quản trị – ĐH Mở TP.HCM",
        source: "Đại học Mở TP.HCM",
        tags: ["ke_toan_quan_tri", "chi_phi_doanh_thu", "tinh_gia", "fifo_binh_quan", "chu_trinh_ke_toan"],
        questions: [
          {
            type: "mcq",
            content: "Kế toán quản trị khác kế toán tài chính ở điểm nào?",
            options: [
              "Phục vụ cho người sử dụng nội bộ (quản lý) thay vì bên ngoài",
              "Bắt buộc tuân thủ chuẩn mực kế toán chung",
              "Chỉ ghi nhận số liệu quá khứ",
              "Lập báo cáo theo định kỳ cố định",
            ],
            correctAnswer: "Phục vụ cho người sử dụng nội bộ (quản lý) thay vì bên ngoài",
            orderIndex: 0,
          },
          {
            type: "mcq",
            content: "Phương pháp tính giá xuất kho FIFO có đặc điểm gì?",
            options: [
              "Hàng nhập trước xuất trước, hàng nhập sau xuất sau",
              "Hàng nhập sau xuất trước, hàng nhập trước xuất sau",
              "Tính giá bình quân của tất cả hàng tồn kho",
              "Xuất theo giá thực tế đích danh",
            ],
            correctAnswer: "Hàng nhập trước xuất trước, hàng nhập sau xuất sau",
            orderIndex: 1,
          },
          {
            type: "mcq",
            content: "Chi phí sản xuất chung biến đổi bao gồm:",
            options: [
              "Tiền thuê xưởng sản xuất",
              "Khấu hao máy móc thiết bị",
              "Điện nước sử dụng trong sản xuất",
              "Lương quản lý nhà máy (cố định)",
            ],
            correctAnswer: "Điện nước sử dụng trong sản xuất",
            orderIndex: 2,
          },
          {
            type: "mcq",
            content: "Điểm hòa vốn được xác định khi:",
            options: [
              "Doanh thu = Tổng chi phí cố định + Tổng chi phí biến đổi",
              "Doanh thu = Tổng chi phí cố định",
              "Doanh thu = Tổng chi phí biến đổi",
              "Lợi nhuận > 0",
            ],
            correctAnswer: "Doanh thu = Tổng chi phí cố định + Tổng chi phí biến đổi",
            orderIndex: 3,
          },
          {
            type: "mcq",
            content: "Doanh nghiệp nhập kho nguyên vật liệu theo 3 lần:\n- Lần 1: 100kg × 20.000đ/kg\n- Lần 2: 150kg × 22.000đ/kg\n- Lần 3: 200kg × 21.000đ/kg\n\nXuất kho 250kg theo phương pháp FIFO. Giá trị xuất kho là:",
            options: [
              "5.300.000đ",
              "5.350.000đ",
              "5.400.000đ",
              "5.250.000đ",
            ],
            correctAnswer: "5.300.000đ",
            orderIndex: 4,
          },
          {
            type: "essay",
            content: "Một doanh nghiệp sản xuất sản phẩm A có dữ liệu sau:\n- Giá bán: 100.000đ/sp\n- Chi phí biến đổi đơn vị: 60.000đ/sp\n- Chi phí cố định định kỳ: 40.000.000đ\n\nYêu cầu:\n1. Tính điểm hòa vốn (số lượng và doanh thu)\n2. Tính lợi nhuận khi bán 1.500 sản phẩm",
            correctAnswer: "**1. Điểm hòa vốn:**\n- Tỷ lệ đóng góp = (100.000 - 60.000) / 100.000 = 40%\n- Điểm hòa vốn (số lượng) = 40.000.000 / (100.000 - 60.000) = **1.000 sản phẩm**\n- Điểm hòa vốn (doanh thu) = 1.000 × 100.000 = **100.000.000đ**\n\n**2. Lợi nhuận khi bán 1.500 sp:**\n- Doanh thu = 1.500 × 100.000 = 150.000.000đ\n- Chi phí biến đổi = 1.500 × 60.000 = 90.000.000đ\n- Chi phí cố định = 40.000.000đ\n- Lợi nhuận = 150.000.000 - 90.000.000 - 40.000.000 = **20.000.000đ**",
            orderIndex: 5,
          },
        ],
      },
    ],
  },

  // ── Tài chính – Ngân hàng (Banking) ───────────────────────────────
  {
    slug: "tai_chinh_ngan_hang",
    name: "Tài chính – Ngân hàng",
    deThi: [
      {
        title: "Đề thi Tài chính – Tiền tệ – HVNH",
        source: "Học viện Ngân hàng",
        tags: ["tai_chinh_tien_te", "lai_suat", "chinh_sach_tien_te", "ngan_hang_trung_uong", "gia_tri_hien_tai"],
        questions: [
          {
            type: "mcq",
            content: "Lãi suất thực sẽ giảm khi:",
            options: [
              "Lãi suất danh nghĩa tăng nhanh hơn tỷ lệ lạm phát",
              "Lãi suất danh nghĩa tăng chậm hơn tỷ lệ lạm phát",
              "Tỷ lệ lạm phát giảm",
              "Lãi suất danh nghĩa không đổi và lạm phát giảm",
            ],
            correctAnswer: "Lãi suất danh nghĩa tăng chậm hơn tỷ lệ lạm phát",
            orderIndex: 0,
          },
          {
            type: "mcq",
            content: "Cơ sở để một ngân hàng tiến hành lựa chọn khách hàng vay bao gồm:",
            options: [
              "Khách hàng thuộc đối tượng ưu tiên của Nhà nước",
              "Khách hàng có công với cách mạng",
              "Căn cứ vào mức độ rủi ro và thu nhập của món vay",
              "Khách hàng có tài sản lớn",
            ],
            correctAnswer: "Căn cứ vào mức độ rủi ro và thu nhập của món vay",
            orderIndex: 1,
          },
          {
            type: "mcq",
            content: "Ngân hàng trung ương thực hiện chính sách tiền tệ mở rộng bằng cách:",
            options: [
              "Tăng tỷ lệ dự trữ bắt buộc",
              "Giảm tỷ lệ dự trữ bắt buộc",
              "Bán trái phiếu chính phủ trên thị trường mở",
              "Tăng lãi suất tái chiết khấu",
            ],
            correctAnswer: "Giảm tỷ lệ dự trữ bắt buộc",
            orderIndex: 2,
          },
          {
            type: "mcq",
            content: "Lãi kép khác lãi đơn ở điểm:",
            options: [
              "Lãi kép tính trên gốc ban đầu, lãi đơn tính trên gốc + lãi kỳ trước",
              "Lãi kép tính trên gốc + lãi kỳ trước, lãi đơn chỉ tính trên gốc ban đầu",
              "Lãi kép luôn cao hơn lãi đơn",
              "Không có khác biệt",
            ],
            correctAnswer: "Lãi kép tính trên gốc + lãi kỳ trước, lãi đơn chỉ tính trên gốc ban đầu",
            orderIndex: 3,
          },
          {
            type: "mcq",
            content: "Phương pháp trả đều (annuity) là:",
            options: [
              "Trả gốc đều đặn, lãi giảm dần",
              "Trả một khoản cố định mỗi kỳ gồm cả gốc và lãi",
              "Trả toàn bộ gốc và lãi vào cuối kỳ",
              "Chỉ trả lãi mỗi kỳ, gốc trả cuối kỳ",
            ],
            correctAnswer: "Trả một khoản cố định mỗi kỳ gồm cả gốc và lãi",
            orderIndex: 4,
          },
          {
            type: "mcq",
            content: "Công thức tính giá trị hiện tại (PV) của một khoản tiền F nhận được sau n kỳ với lãi suất r là:",
            options: [
              "PV = F × (1 + r)^n",
              "PV = F / (1 + r)^n",
              "PV = F × r × n",
              "PV = F / (r × n)",
            ],
            correctAnswer: "PV = F / (1 + r)^n",
            orderIndex: 5,
          },
          {
            type: "mcq",
            content: "Chính sách tiền tệ thắt chặt được áp dụng khi:",
            options: [
              "Nền kinh tế đang suy thoái",
              "Lạm phát cao, nền kinh tế phát triển quá nóng",
              "Tỷ giá ngoại tệ giảm mạnh",
              "Ngân hàng thương mại thiếu thanh khoản",
            ],
            correctAnswer: "Lạm phát cao, nền kinh tế phát triển quá nóng",
            orderIndex: 6,
          },
          {
            type: "essay",
            content: "Một người gửi tiết kiệm 100.000.000đ vào ngân hàng với lãi suất 6%/năm, tính lãi kép theo năm.\n\nYêu cầu: Tính số tiền nhận được sau 3 năm.",
            correctAnswer: "Số tiền sau 3 năm (lãi kép):\n\nFV = PV × (1 + r)^n\nFV = 100.000.000 × (1 + 0.06)^3\nFV = 100.000.000 × 1.191016\nFV = **119.101.600đ**\n\nTrong đó lãi thu được = 119.101.600 - 100.000.000 = 19.101.600đ",
            orderIndex: 7,
          },
          {
            type: "essay",
            content: "Một doanh nghiệp vay 500.000.000đ từ ngân hàng, lãi suất 12%/năm, thời hạn 3 năm, trả đều theo năm.\n\nYêu cầu: Tính khoản trả mỗi năm và tổng lãi phải trả.\n\nGợi ý: Hệ số hoàn vốn = r(1+r)^n / [(1+r)^n - 1]",
            correctAnswer: "Khoản trả đều mỗi năm (A):\n\nHệ số hoàn vốn = 0.12 × (1.12)^3 / [(1.12)^3 - 1]\n= 0.12 × 1.404928 / (1.404928 - 1)\n= 0.168591 / 0.404928\n= 0.41635\n\nA = 500.000.000 × 0.41635 = **208.175.000đ/năm**\n\nTổng trả = 208.175.000 × 3 = 624.525.000đ\nTổng lãi = 624.525.000 - 500.000.000 = **124.525.000đ**",
            orderIndex: 8,
          },
        ],
      },
      {
        title: "Đề thi Ngân hàng Thương mại – ĐH Kinh tế Đà Nẵng",
        source: "Đại học Kinh tế Đà Nẵng",
        tags: ["ngan_hang_thuong_mai", "tin_dung", "cho_vay", "rui_ro_tin_dung", "bao_lanh_ngan_hang"],
        questions: [
          {
            type: "mcq",
            content: "Ngân hàng thương mại thực hiện chức năng cơ bản nào sau đây?",
            options: [
              "Phát hành tiền mặt",
              "Huy động vốn, cấp tín dụng và cung ứng dịch vụ ngân hàng",
              "Quản lý dự trữ ngoại hối quốc gia",
              "Định hướng chính sách tiền tệ quốc gia",
            ],
            correctAnswer: "Huy động vốn, cấp tín dụng và cung ứng dịch vụ ngân hàng",
            orderIndex: 0,
          },
          {
            type: "mcq",
            content: "Rủi ro tín dụng là:",
            options: [
              "Rủi ro do biến động lãi suất thị trường",
              "Rủi ro do khách hàng không thực hiện hoặc không thực hiện đúng nghĩa vụ trả nợ",
              "Rủi ro do tỷ giá ngoại tệ biến động",
              "Rủi ro do ngân hàng thiếu thanh khoản",
            ],
            correctAnswer: "Rủi ro do khách hàng không thực hiện hoặc không thực hiện đúng nghĩa vụ trả nợ",
            orderIndex: 1,
          },
          {
            type: "mcq",
            content: "Bảo lãnh ngân hàng là:",
            options: [
              "Hình thức cấp tín dụng mà ngân hàng cam kết thực hiện nghĩa vụ thay cho khách hàng nếu khách hàng không thực hiện",
              "Hình thức huy động vốn từ dân cư",
              "Dịch vụ thanh toán quốc tế",
              "Hình thức đầu tư chứng khoán",
            ],
            correctAnswer: "Hình thức cấp tín dụng mà ngân hàng cam kết thực hiện nghĩa vụ thay cho khách hàng nếu khách hàng không thực hiện",
            orderIndex: 2,
          },
          {
            type: "mcq",
            content: "Chiết khấu thương phiếu là:",
            options: [
              "Ngân hàng mua lại thương phiếu chưa đến hạn thanh toán với giá thấp hơn mệnh giá",
              "Ngân hàng bán thương phiếu cho khách hàng",
              "Ngân hàng phát hành thương phiếu mới",
              "Ngân hàng thu hộ thương phiếu đến hạn",
            ],
            correctAnswer: "Ngân hàng mua lại thương phiếu chưa đến hạn thanh toán với giá thấp hơn mệnh giá",
            orderIndex: 3,
          },
          {
            type: "mcq",
            content: "Nguyên tắc cấp tín dụng '3 đúng' là:",
            options: [
              "Đúng đối tượng, đúng mục đích, đúng thời hạn",
              "Đ đúng số tiền, đúng lãi suất, đúng thời gian",
              "Đúng khách hàng, đúng tài sản, đúng giấy tờ",
              "Đúng ngân hàng, đúng chi nhánh, đúng phòng giao dịch",
            ],
            correctAnswer: "Đúng đối tượng, đúng mục đích, đúng thời hạn",
            orderIndex: 4,
          },
          {
            type: "mcq",
            content: "Nghiệp vụ 'cho vay' thuộc nhóm nào trong hoạt động ngân hàng?",
            options: [
              "Nghiệp vụ nợ (huy động vốn)",
              "Nghiệp vụ có (sử dụng vốn)",
              "Nghiệp vụ trung gian",
              "Nghiệp vụ khác",
            ],
            correctAnswer: "Nghiệp vụ có (sử dụng vốn)",
            orderIndex: 5,
          },
          {
            type: "essay",
            content: "Phân tích các loại rủi ro trong hoạt động tín dụng ngân hàng và nêu các biện pháp phòng ngừa.",
            correctAnswer: "**Các loại rủi ro trong tín dụng:**\n\n1. **Rủi ro mất vốn** — Khách hàng mất khả năng thanh toán, ngân hàng mất gốc\n2. **Rủi ro chậm trả** — Khách hàng trả chậm, ảnh hưởng thanh khoản\n3. **Rủi ro lãi suất** — Biến động lãi suất thị trường ảnh hưởng chênh lệch đầu vào/đầu ra\n4. **Rủi ro ngoại hối** — Biến động tỷ giá đối với khoản vay ngoại tệ\n\n**Biện pháp phòng ngừa:**\n- Phân tích tín dụng kỹ lưỡng (3C: Character, Capacity, Capital)\n- Yêu cầu tài sản đảm bảo\n- Phân tán rủi ro (không tập trung vào một khách hàng/ngành)\n- Trích lập dự phòng rủi ro\n- Theo dõi và giám sát sau cho vay",
            orderIndex: 6,
          },
        ],
      },
      {
        title: "Đề thi Tín dụng Ngân hàng – UEL",
        source: "Đại học Kinh tế – Luật (UEL)",
        tags: ["tin_dung", "cho_vay", "rui_ro_tin_dung", "thanh_toan_quoc_te", "chinh_sach_tien_te"],
        questions: [
          {
            type: "mcq",
            content: "Hạn mức tín dụng (credit limit) là:",
            options: [
              "Số tiền tối đa ngân hàng cho phép khách hàng vay trong một thời kỳ nhất định",
              "Số tiền tối thiểu khách hàng phải gửi",
              "Số dư tối thiểu trong tài khoản thanh toán",
              "Mức lãi suất tối đa ngân hàng áp dụng",
            ],
            correctAnswer: "Số tiền tối đa ngân hàng cho phép khách hàng vay trong một thời kỳ nhất định",
            orderIndex: 0,
          },
          {
            type: "mcq",
            content: "Thanh toán quốc tế bằng L/C (Letter of Credit) có ưu điểm gì cho nhà xuất khẩu?",
            options: [
              "Không cần kiểm tra hàng hóa",
              "Được ngân hàng bảo đảm thanh toán, giảm rủi ro không nhận được tiền",
              "Không phải trả phí ngân hàng",
              "Giao hàng trước, nhận tiền sau",
            ],
            correctAnswer: "Được ngân hàng bảo đảm thanh toán, giảm rủi ro không nhận được tiền",
            orderIndex: 1,
          },
          {
            type: "mcq",
            content: "Tỷ lệ dự trữ bắt buộc giảm sẽ tác động thế nào đến cung tiền?",
            options: [
              "Cung tiền giảm",
              "Cung tiền tăng",
              "Cung tiền không đổi",
              "Cung tiền biến động ngẫu nhiên",
            ],
            correctAnswer: "Cung tiền tăng",
            orderIndex: 2,
          },
          {
            type: "mcq",
            content: "Cho vay trả góp là hình thức:",
            options: [
              "Khách hàng trả toàn bộ gốc và lãi vào cuối kỳ",
              "Khách hàng trả cố định định kỳ (tháng/quý) gồm gốc và lãi",
              "Chỉ trả lãi định kỳ, gốc trả cuối kỳ",
              "Ngân hàng miễn lãi cho khoản vay",
            ],
            correctAnswer: "Khách hàng trả cố định định kỳ (tháng/quý) gồm gốc và lãi",
            orderIndex: 3,
          },
          {
            type: "essay",
            content: "Trình bày quy trình cấp tín dụng tại ngân hàng thương mại (các bước cơ bản).",
            correctAnswer: "**Quy trình cấp tín dụng cơ bản:**\n\n1. **Tiếp nhận hồ sơ** — Khách hàng nộp hồ sơ vay vốn\n2. **Thẩm định tín dụng** — Đánh giá năng lực tài chính, lịch sử tín dụng, mục đích vay, tài sản đảm bảo\n3. **Quyết định cho vay** — Cấp có thẩm quyền phê duyệt\n4. **Giải ngân** — Ngân hàng giải ngân theo phương thức thỏa thuận\n5. **Kiểm tra giám sát** — Theo dõi việc sử dụng vốn và tình hình tài chính khách hàng\n6. **Thu nợ** — Khách hàng trả gốc + lãi theo lịch trình\n7. **Xử lý nợ (nếu có)** — Cơ cấu lại nợ, thu hồi nợ, xóa nợ",
            orderIndex: 4,
          },
        ],
      },
    ],
  },

  // ── Quản trị Kinh doanh (Business) ────────────────────────────────
  {
    slug: "quan_tri_kinh_doanh",
    name: "Quản trị Kinh doanh",
    deThi: [
      {
        title: "Đề thi Quản trị Marketing – ĐH Mở TP.HCM",
        source: "Đại học Mở TP.HCM",
        tags: ["quan_tri_marketing", "chien_luoc_marketing", "phan_tich_thi_truong", "chien_luoc_gia", "phan_khuc_thi_truong"],
        questions: [
          {
            type: "mcq",
            content: "Chiến lược Marketing nào tập trung vào việc xây dựng mối quan hệ lâu dài với khách hàng?",
            options: [
              "Marketing đại chúng",
              "Marketing phân khúc",
              "Marketing quan hệ (Relationship Marketing)",
              "Marketing đại lý",
            ],
            correctAnswer: "Marketing quan hệ (Relationship Marketing)",
            orderIndex: 0,
          },
          {
            type: "mcq",
            content: "Vai trò của marketing trong doanh nghiệp là:",
            options: [
              "Chỉ bán hàng và quảng cáo",
              "Kết nối doanh nghiệp với thị trường, hiểu và đáp ứng nhu cầu khách hàng để tạo lợi nhuận",
              "Chỉ sản xuất sản phẩm",
              "Chỉ quản lý tài chính",
            ],
            correctAnswer: "Kết nối doanh nghiệp với thị trường, hiểu và đáp ứng nhu cầu khách hàng để tạo lợi nhuận",
            orderIndex: 1,
          },
          {
            type: "mcq",
            content: "Chiến lược giá nào áp dụng khi doanh nghiệp muốn nhắm đến phân khúc khách hàng cao cấp?",
            options: [
              "Chiến lược giá cao (Premium Pricing)",
              "Chiến lược giá thấp (Penetration Pricing)",
              "Chiến lược giá ngang bằng (Competitive Pricing)",
              "Chiến lược giá thâm nhập",
            ],
            correctAnswer: "Chiến lược giá cao (Premium Pricing)",
            orderIndex: 2,
          },
          {
            type: "mcq",
            content: "Phân khúc thị trường (Market Segmentation) là quá trình:",
            options: [
              "Chia thị trường tổng thể thành các nhóm khách hàng có đặc điểm/nhu cầu tương đồng",
              "Tìm kiếm thị trường mới ở nước ngoài",
              "Giảm giá sản phẩm để tăng thị phần",
              "Phát triển sản phẩm mới",
            ],
            correctAnswer: "Chia thị trường tổng thể thành các nhóm khách hàng có đặc điểm/nhu cầu tương đồng",
            orderIndex: 3,
          },
          {
            type: "mcq",
            content: "Trong chu kỳ sống sản phẩm, giai đoạn suy thoái nên áp dụng chiến lược giá nào?",
            options: [
              "Tăng giá để tối đa hóa lợi nhuận",
              "Giảm giá để duy trì thị phần hoặc rút lui",
              "Giữ nguyên giá",
              "Áp dụng giá cao cấp",
            ],
            correctAnswer: "Giảm giá để duy trì thị phần hoặc rút lui",
            orderIndex: 4,
          },
          {
            type: "mcq",
            content: "Định vị thương hiệu (Brand Positioning) là:",
            options: [
              "Đặt tên thương hiệu",
              "Tạo hình ảnh và vị trí độc đáo cho thương hiệu trong tâm trí khách hàng mục tiêu",
              "Thiết kế logo và bao bì",
              "Đăng ký nhãn hiệu",
            ],
            correctAnswer: "Tạo hình ảnh và vị trí độc đáo cho thương hiệu trong tâm trí khách hàng mục tiêu",
            orderIndex: 5,
          },
          {
            type: "mcq",
            content: "Marketing quốc tế: Khi thâm nhập thị trường nước ngoài, doanh nghiệp điều chỉnh sản phẩm để phù hợp với nhu cầu địa phương. Đây là chiến lược:",
            options: [
              "Thích nghi sản phẩm (Product Adaptation)",
              "Tiêu chuẩn hóa sản phẩm",
              "Phát triển sản phẩm mới",
              "Rút lui khỏi thị trường",
            ],
            correctAnswer: "Thích nghi sản phẩm (Product Adaptation)",
            orderIndex: 6,
          },
          {
            type: "essay",
            content: "So sánh marketing phân biệt và marketing không phân biệt. Nêu ưu nhược điểm của từng phương pháp.",
            correctAnswer: "**Marketing không phân biệt (Undifferentiated):**\n- Coi toàn bộ thị trường là một, dùng 1 chiến lược marketing cho tất cả\n- Ưu: Tiết kiệm chi phí, dễ quản lý, kinh tế nhờ quy mô\n- Nhược: Không đáp ứng được nhu cầu đa dạng, dễ bị cạnh tranh\n\n**Marketing phân biệt (Differentiated):**\n- Chia thị trường thành nhiều phân khúc, mỗi phân khúc có chiến lược riêng\n- Ưu: Đáp ứng tốt nhu cầu khách hàng, tăng thị phần, giảm rủi ro\n- Nhược: Chi phí cao, phức tạp trong quản lý, cần nguồn lực lớn",
            orderIndex: 7,
          },
          {
            type: "essay",
            content: "Phân tích các yếu tố trong Marketing Mix (4P) cho một sản phẩm tiêu dùng nhanh (FMCG) bất kỳ.",
            correctAnswer: "**Marketing Mix (4P) cho sản phẩm FMCG (ví dụ: nước giải khát):**\n\n1. **Product (Sản phẩm):**\n   - Chất lượng, bao bì, nhãn hiệu, kích cỡ, đa dạng hương vị\n   - Đóng gói hấp dẫn, dễ nhận biết\n\n2. **Price (Giá):**\n   - Giá cạnh tranh, phù hợp thu nhập mục tiêu\n   - Chiến lược giá thâm nhập ban đầu, sau đó duy trì\n   - Khuyến mãi, giảm giá theo mùa\n\n3. **Place (Phân phối):**\n   - Phủ sóng rộng: siêu thị, tạp hóa, cửa hàng tiện lợi\n   - Kênh trực tuyến (e-commerce)\n   - Hệ thống phân phối đa tầng\n\n4. **Promotion (Truyền thông):**\n   - Quảng cáo TV, mạng xã hội, KOL/influencer\n   - Khuyến mãi tại điểm bán\n   - Tài trợ sự kiện, thể thao",
            orderIndex: 8,
          },
        ],
      },
      {
        title: "Đề thi Quản trị Chiến lược – UEL",
        source: "Đại học Kinh tế – Luật (UEL)",
        tags: ["quan_tri_chien_luoc", "swot", "porter_5_luc", "tam_nhin_su_menh", "bcg_matrix"],
        questions: [
          {
            type: "mcq",
            content: "Bản chất của quản trị chiến lược là quá trình duy trì sự phù hợp giữa:",
            options: [
              "Các phòng ban chức năng trong tổ chức",
              "Mục tiêu ngắn hạn và mục tiêu dài hạn",
              "Nguồn lực, năng lực nội tại và môi trường bên ngoài",
              "Chiến lược marketing và chiến lược tài chính",
            ],
            correctAnswer: "Nguồn lực, năng lực nội tại và môi trường bên ngoài",
            orderIndex: 0,
          },
          {
            type: "mcq",
            content: "Một startup đặt tầm nhìn: 'Trở thành kỳ lân công nghệ tiếp theo của Đông Nam Á'. Đây là tuyên bố về:",
            options: [
              "Tầm nhìn (Vision)",
              "Sứ mệnh (Mission)",
              "Mục tiêu cấp chức năng",
              "Giá trị cốt lõi (Core Values)",
            ],
            correctAnswer: "Tầm nhìn (Vision)",
            orderIndex: 1,
          },
          {
            type: "mcq",
            content: "Phân tích 5 lực lượng cạnh tranh của Porter bao gồm:",
            options: [
              "Rivalry, Threat of new entrants, Bargaining power of buyers, Bargaining power of suppliers, Threat of substitutes",
              "SWOT, PESTEL, BCG, Ansoff, Porter's Value Chain",
              "Price, Product, Place, Promotion, People",
              "Strengths, Weaknesses, Opportunities, Threats, Trends",
            ],
            correctAnswer: "Rivalry, Threat of new entrants, Bargaining power of buyers, Bargaining power of suppliers, Threat of substitutes",
            orderIndex: 2,
          },
          {
            type: "mcq",
            content: "Ma trận BCG (Boston Consulting Group) phân loại sản phẩm/business unit theo:",
            options: [
              "Thị phần tương đối và tốc độ tăng trưởng thị trường",
              "Chi phí và doanh thu",
              "Số lượng khách hàng và mức độ hài lòng",
              "Chất lượng và giá cả",
            ],
            correctAnswer: "Thị phần tương đối và tốc độ tăng trưởng thị trường",
            orderIndex: 3,
          },
          {
            type: "mcq",
            content: "Trong ma trận BCG, 'Ngôi sao' (Star) là:",
            options: [
              "Thị phần cao, tăng trưởng cao",
              "Thị phần thấp, tăng trưởng cao",
              "Thị phần cao, tăng trưởng thấp",
              "Thị phần thấp, tăng trưởng thấp",
            ],
            correctAnswer: "Thị phần cao, tăng trưởng cao",
            orderIndex: 4,
          },
          {
            type: "mcq",
            content: "Chiến lược hội nhập dọc (Vertical Integration) là:",
            options: [
              "Mua lại hoặc sáp nhập với đối thủ cạnh tranh cùng ngành",
              "Mua lại nhà cung cấp hoặc kênh phân phối (hội nhập về phía sau hoặc phía trước)",
              "Đa dạng hóa sang ngành kinh doanh mới",
              "Thu hẹp quy mô hoạt động",
            ],
            correctAnswer: "Mua lại nhà cung cấp hoặc kênh phân phối (hội nhập về phía sau hoặc phía trước)",
            orderIndex: 5,
          },
          {
            type: "essay",
            content: "Phân tích SWOT cho một doanh nghiệp bán lẻ trực tuyến (e-commerce) tại Việt Nam. Nêu ví dụ cụ thể.",
            correctAnswer: "**Phân tích SWOT cho doanh nghiệp e-commerce Việt Nam:**\n\n**Strengths (Điểm mạnh):**\n- Nền tảng công nghệ hiện đại, dễ sử dụng\n- Mạng lưới đối tác vận chuyển rộng\n- Dữ liệu khách hàng lớn, hiểu rõ hành vi người dùng\n\n**Weaknesses (Điểm yếu):**\n- Chi phí vận hành cao (logistics, kho bãi)\n- Tỷ lệ hoàn hàng cao\n- Phụ thuộc vào bên thứ ba (ngân hàng, vận chuyển)\n\n**Opportunities (Cơ hội):**\n- Thị trường e-commerce Việt Nam đang tăng trưởng nhanh\n- Thanh toán không tiền mặt ngày càng phổ biến\n- Chính phủ hỗ trợ kinh tế số\n\n**Threats (Thách thức):**\n- Cạnh tranh gay gắt từ Shopee, Lazada, TikTok Shop\n- Rủi ro an ninh mạng, lộ dữ liệu\n- Thay đổi pháp lý về thương mại điện tử",
            orderIndex: 6,
          },
          {
            type: "essay",
            content: "Trình bày các cấp chiến lược trong quản trị chiến lược và cho ví dụ cho từng cấp.",
            correctAnswer: "**3 cấp chiến lược:**\n\n1. **Chiến lược cấp công ty (Corporate Strategy):**\n   - Quyết định lĩnh vực kinh doanh nào tham gia, phân bổ nguồn lực\n   - Ví dụ: Vingroup quyết định tham gia bất động sản, ô tô, bán lẻ, y tế\n\n2. **Chiến lược cấp kinh doanh (Business Strategy):**\n   - Cách cạnh tranh trong từng lĩnh vực: dẫn đạo chi phí, khác biệt hóa, tập trung\n   - Ví dụ: VinFast chọn khác biệt hóa bằng xe điện thông minh\n\n3. **Chiến lược cấp chức năng (Functional Strategy):**\n   - Chiến lược cho từng phòng ban: marketing, tài chính, nhân sự, R&D\n   - Ví dụ: Chiến lược marketing VinFast — tài trợ sự kiện toàn cầu, quảng cáo KOL",
            orderIndex: 7,
          },
        ],
      },
    ],
  },
];

// ─── Seed Execution ─────────────────────────────────────────────────
async function main() {
  console.log("Seeding database...");

  let totalDeThi = 0;
  let totalQuestions = 0;

  for (const subjectData of SEED_DATA) {
    // Upsert subject
    const subject = await prisma.subject.upsert({
      where: { slug: subjectData.slug },
      update: { name: subjectData.name },
      create: { slug: subjectData.slug, name: subjectData.name },
    });

    console.log(`  Subject: ${subjectData.name} (${subjectData.slug})`);

    for (const deThiData of subjectData.deThi) {
      const uniqueSlug = slugify(deThiData.title);
      const normalized = normalizeVietnamese(deThiData.title);
      const tagsJson = JSON.stringify(deThiData.tags);

      // Delete existing questions for this đề (to allow re-seeding)
      await prisma.question.deleteMany({
        where: { deThiId: uniqueSlug },
      });

      // Upsert đề thi
      await prisma.deThi.upsert({
        where: { id: uniqueSlug },
        update: {
          title: deThiData.title,
          source: deThiData.source,
          tags: tagsJson,
          normalizedTitle: normalized,
          subjectId: subject.id,
        },
        create: {
          id: uniqueSlug,
          subjectId: subject.id,
          title: deThiData.title,
          source: deThiData.source,
          tags: tagsJson,
          normalizedTitle: normalized,
        },
      });

      // Create questions
      for (const q of deThiData.questions) {
        await prisma.question.create({
          data: {
            deThiId: uniqueSlug,
            type: q.type,
            content: q.content,
            options: q.options ? JSON.stringify(q.options) : null,
            correctAnswer: q.correctAnswer,
            orderIndex: q.orderIndex,
          },
        });
        totalQuestions++;
      }

      totalDeThi++;
      console.log(`    Đề: ${deThiData.title} — ${deThiData.questions.length} questions`);
    }
  }

  console.log(`\n  ${totalDeThi} de_thi upserted`);
  console.log(`  ${totalQuestions} questions created`);
  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
