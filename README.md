<!DOCTYPE html>
<html lang="vi" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ước tính Chi phí Xây dựng Nhà phố Trọn Gói - ESB Homes</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Be Vietnam Pro', sans-serif;
            background-color: #0A192F; /* Dark blue background */
            color: #E0E7FF; /* Light yellow-ish text */
        }
        .nav-bar {
            background-color: #1F2937; /* Slightly lighter dark blue for nav */
            box-shadow: 0 -4px 6px -1px rgb(0 0 0 / 0.1), 0 -2px 4px -2px rgb(0 0 0 / 0.06);
        }
        .nav-link {
            transition: all 0.3s ease;
            border-top: 3px solid transparent;
            color: #E0E7FF; /* Light text for nav links */
        }
        .nav-link.active, .nav-link:hover {
            color: #FBBF24; /* Golden yellow accent */
            border-top-color: #FBBF24;
            background-color: rgba(251, 191, 36, 0.1); /* Subtle yellow highlight */
        }
        .content-card {
            background-color: #ffffff;
            border: 1px solid #374151; /* Darker border for contrast */
            border-radius: 0.75rem;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.06);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            color: #3a3a3a; /* Dark text inside cards */
        }
        .content-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.08);
        }
        .chart-container {
            position: relative;
            width: 100%;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
            height: 350px;
            max-height: 450px;
        }
        @media (min-width: 768px) {
            .chart-container {
                height: 400px;
            }
        }
        .collapsible-content {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.5s ease-in-out;
        }
        .loading-spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #FBBF24; /* Golden yellow spinner */
            border-radius: 50%;
            width: 30px;
            height: 30px;
            animation: spin 1s linear infinite;
            display: none;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        /* Specific styles for elements within content-card to ensure dark text */
        .content-card h3, .content-card h4, .content-card p, .content-card ul, .content-card li, .content-card label, .content-card input, .content-card select, .content-card textarea {
            color: #3a3a3a;
        }
        .content-card .text-gray-700 {
            color: #3a3a3a;
        }
        .content-card .font-medium {
            color: #3a3a3a;
        }
        .content-card .text-sm {
            color: #4B5563; /* Slightly lighter gray for small text */
        }
        .content-card .text-red-600 {
            color: #DC2626; /* Red for errors */
        }
        .content-card .bg-gray-50 {
            background-color: #F9FAFB; /* Light gray for input backgrounds */
        }
        .content-card .text-[#a0522d] { /* Adjusting accent color for headings inside cards */
            color: #D97706; /* A darker orange/gold for contrast on white */
        }
        .content-card .text-[#d28b5e] { /* Adjusting accent color for subheadings inside cards */
            color: #FBBF24; /* Golden yellow for contrast on white */
        }
        .content-card .text-gray-800 {
            color: #1F2937; /* Dark gray for specific text */
        }
        .tag {
            background-color: #FBBF24; /* Golden yellow tag background */
            color: #1F2937; /* Dark text on tag */
        }

    </style>
</head>
<body class="flex flex-col min-h-screen">

    <div class="fixed top-4 left-4 z-50">
        <img src="https://firebasestorage.googleapis.com/v0/b/generative-ai-document-test.appspot.com/o/images%2FLOGO_ESB%20Homes.png-f4589be0-33e0-4aab-969a-dcf2a68e9695?alt=media&token=e91f03f5-7e04-4c8d-862d-004a4e17f7d7" alt="Logo ESB Homes" class="w-24 h-auto object-contain">
    </div>

    <main class="flex-1 p-4 sm:p-6 md:p-10 pb-24 lg:pb-24">
        <div class="max-w-7xl mx-auto">
            
            <section id="gioi-thieu" class="min-h-screen pt-16">
                <h2 class="text-3xl font-bold mb-4 text-[#FBBF24]">Chào mừng đến với Công cụ Ước tính Chi phí Xây dựng Nhà phố</h2>
                <p class="mb-6 text-lg font-medium">
                    Việc xây dựng một ngôi nhà phố trọn gói đòi hỏi sự hiểu biết rõ ràng về các yếu tố chi phí. Công cụ này được thiết kế để cung cấp cho bạn một ước tính sơ bộ về tổng chi phí xây dựng dựa trên các thông số cơ bản như diện tích, số tầng, phong cách thiết kế và mức độ hoàn thiện. Hãy khám phá để có cái nhìn tổng quan về ngân sách cần thiết cho ngôi nhà mơ ước của bạn.
                </p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="content-card p-6">
                        <h3 class="text-xl font-bold mb-3 text-[#D97706]">Ước tính nhanh chóng</h3>
                        <p class="font-medium">Nhận ngay ước tính chi phí dựa trên các thông số bạn cung cấp, giúp bạn lập kế hoạch tài chính hiệu quả.</p>
                    </div>
                    <div class="content-card p-6">
                        <h3 class="text-xl font-bold mb-3 text-[#D97706]">Hiểu rõ các yếu tố</h3>
                        <p class="font-medium">Tìm hiểu sâu hơn về những yếu tố chính ảnh hưởng đến tổng chi phí xây dựng nhà phố trọn gói.</p>
                    </div>
                </div>
            </section>

            <section id="yeu-to-anh-huong" class="min-h-screen pt-16">
                <h2 class="text-3xl font-bold mb-4 text-[#FBBF24]">Các Yếu tố Ảnh hưởng đến Chi phí Xây dựng</h2>
                <p class="mb-8 text-lg font-medium">
                    Chi phí xây dựng một ngôi nhà phố trọn gói không chỉ phụ thuộc vào diện tích mà còn bị chi phối bởi nhiều yếu tố khác. Việc hiểu rõ những yếu tố này sẽ giúp bạn đưa ra quyết định sáng suốt và tối ưu hóa ngân sách của mình.
                </p>
                <div id="factors-container" class="space-y-4">
                    <div class="content-card overflow-hidden">
                        <button class="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 flex justify-between items-center cursor-pointer">
                            <h3 class="text-lg font-bold text-[#D97706]">Diện tích và Quy mô</h3>
                            <span class="transform transition-transform duration-300 text-2xl text-[#FBBF24]">+</span>
                        </button>
                        <div class="collapsible-content">
                            <p class="p-4 pt-0 font-medium">Tổng diện tích sàn xây dựng và số tầng là yếu tố cơ bản nhất. Diện tích càng lớn, số tầng càng nhiều thì chi phí càng tăng. Tuy nhiên, chi phí trên mỗi mét vuông có thể giảm khi quy mô lớn hơn do hiệu quả kinh tế theo quy mô.</p>
                        </div>
                    </div>
                    <div class="content-card overflow-hidden">
                        <button class="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 flex justify-between items-center cursor-pointer">
                            <h3 class="text-lg font-bold text-[#D97706]">Phong cách Thiết kế</h3>
                            <span class="transform transition-transform duration-300 text-2xl text-[#FBBF24]">+</span>
                        </button>
                        <div class="collapsible-content">
                            <p class="p-4 pt-0 font-medium">Phong cách hiện đại thường có chi phí thấp hơn so với phong cách tân cổ điển, cổ điển do yêu cầu về chi tiết kiến trúc, hoa văn, vật liệu trang trí phức tạp hơn.</p>
                        </div>
                    </div>
                    <div class="content-card overflow-hidden">
                        <button class="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 flex justify-between items-center cursor-pointer">
                            <h3 class="text-lg font-bold text-[#D97706]">Mức độ Hoàn thiện và Vật liệu</h3>
                            <span class="transform transition-transform duration-300 text-2xl text-[#FBBF24]">+</span>
                        </button>
                        <div class="collapsible-content">
                            <p class="p-4 pt-0 font-medium">Đây là yếu tố có ảnh hưởng lớn nhất đến chi phí. Việc lựa chọn vật liệu hoàn thiện (gạch ốp lát, sơn, thiết bị vệ sinh, nội thất) từ bình dân đến cao cấp sẽ tạo ra sự khác biệt đáng kể về giá.</p>
                        </div>
                    </div>
                    <div class="content-card overflow-hidden">
                        <button class="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 flex justify-between items-center cursor-pointer">
                            <h3 class="text-lg font-bold text-[#D97706]">Công năng và Tiện ích</h3>
                            <span class="transform transition-transform duration-300 text-2xl text-[#FBBF24]">+</span>
                        </button>
                        <div class="collapsible-content">
                            <p class="p-4 pt-0 font-medium">Các yêu cầu đặc biệt về công năng như thang máy, hồ bơi nhỏ, hệ thống nhà thông minh, hoặc các không gian phức tạp (ví dụ: giếng trời lớn, sân vườn trên mái) sẽ làm tăng chi phí.</p>
                        </div>
                    </div>
                    <div class="content-card overflow-hidden">
                        <button class="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 flex justify-between items-center cursor-pointer">
                            <h3 class="text-lg font-bold text-[#D97706]">Vị trí và Điều kiện Thi công</h3>
                            <span class="transform transition-transform duration-300 text-2xl text-[#FBBF24]">+</span>
                        </button>
                        <div class="collapsible-content">
                            <p class="p-4 pt-0 font-medium">Địa chất yếu, hẻm nhỏ, khu vực khó vận chuyển vật liệu, hoặc yêu cầu về giấy phép xây dựng phức tạp có thể làm tăng chi phí phát sinh.</p>
                        </div>
                    </div>
                    <div class="content-card overflow-hidden">
                        <button class="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 flex justify-between items-center cursor-pointer">
                            <h3 class="text-lg font-bold text-[#D97706]">Loại Móng</h3>
                            <span class="transform transition-transform duration-300 text-2xl text-[#FBBF24]">+</span>
                        </button>
                        <div class="collapsible-content">
                            <p class="p-4 pt-0 font-medium">Loại móng (đơn, băng, cọc) phụ thuộc vào địa chất và tải trọng công trình. Móng cọc thường có chi phí cao nhất do yêu cầu kỹ thuật và vật liệu phức tạp hơn.</p>
                        </div>
                    </div>
                    <div class="content-card overflow-hidden">
                        <button class="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 flex justify-between items-center cursor-pointer">
                            <h3 class="text-lg font-bold text-[#D97706]">Tầng Lửng</h3>
                            <span class="transform transition-transform duration-300 text-2xl text-[#FBBF24]">+</span>
                        </button>
                        <div class="collapsible-content">
                            <p class="p-4 pt-0 font-medium">Việc có tầng lửng sẽ tăng diện tích sử dụng nhưng cũng làm tăng chi phí kết cấu và hoàn thiện cho phần không gian này.</p>
                        </div>
                    </div>
                    <div class="content-card overflow-hidden">
                        <button class="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 flex justify-between items-center cursor-pointer">
                            <h3 class="text-lg font-bold text-[#D97706]">Sân Thượng</h3>
                            <span class="transform transition-transform duration-300 text-2xl text-[#FBBF24]">+</span>
                        </button>
                        <div class="collapsible-content">
                            <p class="p-4 pt-0 font-medium">Thiết kế sân thượng có thể bao gồm chi phí chống thấm, ốp lát, lan can, và các tiện ích khác như cây xanh, khu vực thư giãn.</p>
                        </div>
                    </div>
                    <div class="content-card overflow-hidden">
                        <button class="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 flex justify-between items-center cursor-pointer">
                            <h3 class="text-lg font-bold text-[#D97706]">Loại Mái</h3>
                            <span class="transform transition-transform duration-300 text-2xl text-[#FBBF24]">+</span>
                        </button>
                        <div class="collapsible-content">
                            <p class="p-4 pt-0 font-medium">Mái bằng thường tiết kiệm hơn so với mái dốc (mái Thái, mái Nhật) do cấu trúc đơn giản hơn. Mái dốc yêu cầu hệ khung kèo và vật liệu lợp phức tạp hơn.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="cong-cu-uoc-tinh" class="min-h-screen pt-16">
                <h2 class="text-3xl font-bold mb-4 text-[#FBBF24]">Công cụ Ước tính Chi phí Xây dựng</h2>
                <p class="mb-8 text-lg font-medium">
                    Sử dụng công cụ dưới đây để nhận ước tính và gửi yêu cầu báo giá chi tiết qua email.
                </p>
                <div class="content-card p-6 mb-12">
                    <h3 class="text-xl font-bold mb-4 text-center text-[#D97706]">Nhập thông tin ngôi nhà của bạn</h3>
                    <form id="estimatorForm">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <label for="area" class="block text-sm font-medium mb-1">Diện tích sàn xây dựng (m²):</label>
                                <input type="number" id="area" class="w-full p-2 border border-gray-300 rounded-md focus:ring-[#FBBF24] focus:border-[#FBBF24]" placeholder="Ví dụ: 80" min="20" max="500">
                            </div>
                            <div>
                                <label for="floors" class="block text-sm font-medium mb-1">Số tầng:</label>
                                <input type="number" id="floors" class="w-full p-2 border border-gray-300 rounded-md focus:ring-[#FBBF24] focus:border-[#FBBF24]" placeholder="Ví dụ: 3" min="1" max="7">
                            </div>
                            <div>
                                <label for="style" class="block text-sm font-medium mb-1">Phong cách thiết kế:</label>
                                <select id="style" class="w-full p-2 border border-gray-300 rounded-md focus:ring-[#FBBF24] focus:border-[#FBBF24]">
                                    <option value="modern">Hiện đại</option>
                                    <option value="neoclassical">Tân cổ điển</option>
                                    <option value="minimalist">Tối giản</option>
                                </select>
                            </div>
                            <div>
                                <label for="finish" class="block text-sm font-medium mb-1">Mức độ hoàn thiện:</label>
                                <select id="finish" class="w-full p-2 border border-gray-300 rounded-md focus:ring-[#FBBF24] focus:border-[#FBBF24]">
                                    <option value="basic">Cơ bản</option>
                                    <option value="standard">Trung bình</option>
                                    <option value="premium">Cao cấp</option>
                                </select>
                            </div>
                            <div>
                                <label for="foundation_type" class="block text-sm font-medium mb-1">Loại móng:</label>
                                <select id="foundation_type" class="w-full p-2 border border-gray-300 rounded-md focus:ring-[#FBBF24] focus:border-[#FBBF24]">
                                    <option value="simple">Móng đơn</option>
                                    <option value="strip">Móng băng</option>
                                    <option value="pile">Móng cọc</option>
                                </select>
                            </div>
                            <div>
                                <label for="mezzanine_option" class="block text-sm font-medium mb-1">Có tầng lửng không?</label>
                                <select id="mezzanine_option" class="w-full p-2 border border-gray-300 rounded-md focus:ring-[#FBBF24] focus:border-[#FBBF24]">
                                    <option value="no">Không</option>
                                    <option value="yes">Có</option>
                                </select>
                            </div>
                            <div>
                                <label for="rooftop_option" class="block text-sm font-medium mb-1">Có sân thượng không?</label>
                                <select id="rooftop_option" class="w-full p-2 border border-gray-300 rounded-md focus:ring-[#FBBF24] focus:border-[#FBBF24]">
                                    <option value="no">Không</option>
                                    <option value="yes">Có</option>
                                </select>
                            </div>
                            <div>
                                <label for="roof_type" class="block text-sm font-medium mb-1">Loại mái:</label>
                                <select id="roof_type" class="w-full p-2 border border-gray-300 rounded-md focus:ring-[#FBBF24] focus:border-[#FBBF24]">
                                    <option value="flat">Mái bằng</option>
                                    <option value="thai">Mái Thái</option>
                                    <option value="japanese">Mái Nhật</option>
                                </select>
                            </div>
                             <div>
                                <label for="email" class="block text-sm font-medium mb-1">Email của bạn:</label>
                                <input type="email" id="email" class="w-full p-2 border border-gray-300 rounded-md focus:ring-[#FBBF24] focus:border-[#FBBF24]" placeholder="vidu@email.com" required>
                            </div>
                            <div>
                                <label for="phone" class="block text-sm font-medium mb-1">Số điện thoại:</label>
                                <input type="tel" id="phone" class="w-full p-2 border border-gray-300 rounded-md focus:ring-[#FBBF24] focus:border-[#FBBF24]" placeholder="0912345678" required>
                            </div>
                        </div>
                        
                        <button type="submit" id="calculateAndSendBtn" class="w-full bg-[#FBBF24] text-[#1F2937] font-bold py-3 px-4 rounded-md hover:bg-[#FCD34D] transition-colors duration-300 flex items-center justify-center space-x-2">
                            <span>Ước tính & Gửi Yêu cầu Báo giá</span>
                            <div id="costLoadingSpinner" class="loading-spinner"></div>
                        </button>
                    </form>

                    <div id="costError" class="text-red-600 text-sm mt-4 hidden text-center"></div>
                    <div id="emailNotification" class="text-green-800 bg-green-100 border border-green-400 p-3 rounded-md mt-4 hidden text-center font-medium"></div>
                    
                    <div class="mt-8 p-4 bg-gray-50 rounded-md border border-gray-200">
                        <h4 class="text-lg font-bold mb-2 text-center">Ước tính Chi phí Trọn gói:</h4>
                        <p id="estimatedCost" class="text-2xl font-extrabold text-[#D97706] text-center">-- VNĐ</p>
                        <p class="text-sm text-gray-600 text-center mt-2 font-medium">(*Đây là ước tính sơ bộ, chi phí thực tế có thể thay đổi)</p>
                    </div>

                    <div class="mt-8">
                        <h4 class="text-lg font-bold mb-4 text-center">Phân bổ Chi phí Ước tính</h4>
                        <div class="chart-container">
                             <canvas id="costBreakdownChart"></canvas>
                        </div>
                    </div>
                </div>
            </section>

            <section id="cac-goi-xay-dung" class="min-h-screen pt-16">
                <h2 class="text-3xl font-bold mb-4 text-[#FBBF24]">Các Gói Xây dựng Trọn Gói Phổ biến</h2>
                <p class="mb-8 text-lg font-medium">
                    Để giúp bạn dễ dàng lựa chọn, dưới đây là mô tả các gói xây dựng trọn gói phổ biến với các mức chi phí và tiêu chuẩn vật liệu khác nhau.
                </p>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="content-card p-6 text-center">
                        <h3 class="text-xl font-bold mb-3 text-[#D97706]">Gói Cơ bản</h3>
                        <p class="mb-4 font-medium">Phù hợp với ngân sách tiết kiệm, vật liệu phổ thông nhưng vẫn đảm bảo chất lượng cơ bản.</p>
                        <ul class="list-disc list-inside text-left space-y-1 font-medium">
                            <li>Vật liệu thô tiêu chuẩn</li>
                            <li>Vật liệu hoàn thiện phổ thông (gạch, sơn, thiết bị vệ sinh cơ bản)</li>
                            <li>Thiết kế đơn giản, công năng tối ưu</li>
                        </ul>
                    </div>
                    <div class="content-card p-6 text-center">
                        <h3 class="text-xl font-bold mb-3 text-[#D97706]">Gói Tiêu chuẩn</h3>
                        <p class="mb-4 font-medium">Chất lượng tốt, vật liệu trung cấp, thiết kế đa dạng hơn, đáp ứng nhu cầu sống tiện nghi.</p>
                        <ul class="list-disc list-inside text-left space-y-1 font-medium">
                            <li>Vật liệu thô chất lượng tốt</li>
                            <li>Vật liệu hoàn thiện trung cấp (gạch, sơn, thiết bị vệ sinh khá)</li>
                            <li>Thiết kế linh hoạt, tối ưu không gian</li>
                        </ul>
                    </div>
                    <div class="content-card p-6 text-center">
                        <h3 class="text-xl font-bold mb-3 text-[#D97706]">Gói Cao cấp</h3>
                        <p class="mb-4 font-medium">Vật liệu cao cấp, thiết kế độc đáo, tiện ích hiện đại, mang đến không gian sống sang trọng.</p>
                        <ul class="list-disc list-inside text-left space-y-1 font-medium">
                            <li>Vật liệu thô cao cấp</li>
                            <li>Vật liệu hoàn thiện nhập khẩu, thương hiệu nổi tiếng</li>
                            <li>Thiết kế độc quyền, tích hợp công nghệ thông minh</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section id="luu-y-quan-trong" class="min-h-screen pt-16">
                <h2 class="text-3xl font-bold mb-4 text-[#FBBF24]">Lưu ý Quan trọng</h2>
                <p class="mb-8 text-lg font-medium">
                    Công cụ này cung cấp ước tính sơ bộ. Để có báo giá chính xác nhất, bạn cần tham khảo ý kiến chuyên gia.
                </p>
                <div class="space-y-4">
                    <div class="content-card p-6">
                        <h3 class="text-xl font-bold mb-3 text-[#D97706]">Tham khảo Chuyên gia</h3>
                        <p class="font-medium">Luôn liên hệ với các kiến trúc sư và nhà thầu uy tín để có bản vẽ chi tiết và báo giá chính xác dựa trên khảo sát thực tế công trình.</p>
                    </div>
                    <div class="content-card p-6">
                        <h3 class="text-xl font-bold mb-3 text-[#D97706]">Chi phí Phát sinh</h3>
                        <p class="font-medium">Hãy dự trù một khoản ngân sách dự phòng (khoảng 10-15%) cho các chi phí phát sinh không lường trước trong quá trình thi công.</p>
                    </div>
                    <div class="content-card p-6">
                        <h3 class="text-xl font-bold mb-3 text-[#D97706]">Hợp đồng Minh bạch</h3>
                        <p class="font-medium">Đảm bảo hợp đồng xây dựng rõ ràng, chi tiết về vật tư, tiến độ, và các điều khoản thanh toán để tránh tranh chấp sau này.</p>
                    </div>
                </div>
            </section>

        </div>
    </main>

    <nav class="nav-bar fixed bottom-0 left-0 right-0 h-20 p-4 hidden lg:flex items-center justify-center z-50">
        <ul class="flex space-x-8" id="desktop-nav">
            <li><a href="#gioi-thieu" class="nav-link flex flex-col items-center p-2 rounded-md">
                <svg class="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></svg>
                <span class="text-sm font-semibold">Giới thiệu</span>
            </a></li>
            <li><a href="#yeu-to-anh-huong" class="nav-link flex flex-col items-center p-2 rounded-md">
                <svg class="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></svg>
                <span class="text-sm font-semibold">Yếu tố</span>
            </a></li>
            <li><a href="#cong-cu-uoc-tinh" class="nav-link flex flex-col items-center p-2 rounded-md">
                <svg class="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></svg>
                <span class="text-sm font-semibold">Ước tính</span>
            </a></li>
            <li><a href="#cac-goi-xay-dung" class="nav-link flex flex-col items-center p-2 rounded-md">
                <svg class="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                <span class="text-sm font-semibold">Gói xây dựng</span>
            </a></li>
            <li><a href="#luu-y-quan-trong" class="nav-link flex flex-col items-center p-2 rounded-md">
                <svg class="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path></svg>
                <span class="text-sm font-semibold">Lưu ý</span>
            </a></li>
        </ul>
    </nav>

    <div id="mobile-menu" class="fixed bottom-0 left-0 w-full h-1/2 bg-[#1F2937] shadow-lg p-5 z-40 transform translate-y-full transition-transform duration-300 ease-in-out lg:hidden">
        <h1 class="text-xl font-bold text-[#FBBF24] mb-8 mt-4 text-center">Ước tính Chi phí</h1>
        <ul class="flex flex-col items-center justify-center h-full space-y-4" id="mobile-nav">
            <li><a href="#gioi-thieu" class="nav-link flex flex-col items-center p-2 rounded-md">
                <svg class="w-8 h-8 mb-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></svg>
                <span class="text-md font-semibold">Giới thiệu</span>
            </a></li>
            <li><a href="#yeu-to-anh-huong" class="nav-link flex flex-col items-center p-2 rounded-md">
                <svg class="w-8 h-8 mb-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></svg>
                <span class="text-md font-semibold">Yếu tố Ảnh hưởng</span>
            </a></li>
            <li><a href="#cong-cu-uoc-tinh" class="nav-link flex flex-col items-center p-2 rounded-md">
                <svg class="w-8 h-8 mb-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></svg>
                <span class="text-md font-semibold">Công cụ Ước tính</span>
            </a></li>
            <li><a href="#cac-goi-xay-dung" class="nav-link flex flex-col items-center p-2 rounded-md">
                <svg class="w-8 h-8 mb-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                <span class="text-md font-semibold">Các Gói Xây dựng</span>
            </a></li>
            <li><a href="#luu-y-quan-trong" class="nav-link flex flex-col items-center p-2 rounded-md">
                <svg class="w-8 h-8 mb-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path></svg>
                <span class="text-md font-semibold">Lưu ý Quan trọng</span>
            </a></li>
        </ul>
    </div>
    <div id="mobile-menu-overlay" class="fixed inset-0 bg-black opacity-0 z-30 transition-opacity duration-300 ease-in-out hidden"></div>


<script>
window.onload = function() {
    // Collapsible content for Influencing Factors
    document.querySelectorAll('#factors-container button').forEach(button => {
        button.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('span:last-child');
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                icon.style.transform = 'rotate(0deg)';
            } else {
                // Close other open items
                document.querySelectorAll('#factors-container .collapsible-content').forEach(item => {
                    item.style.maxHeight = null;
                    item.previousElementSibling.querySelector('span:last-child').style.transform = 'rotate(0deg)';
                });
                content.style.maxHeight = content.scrollHeight + "px";
                icon.style.transform = 'rotate(45deg)';
            }
        });
    });

    // Cost Estimation Logic
    const estimatorForm = document.getElementById('estimatorForm');
    const areaInput = document.getElementById('area');
    const floorsInput = document.getElementById('floors');
    const styleSelect = document.getElementById('style');
    const finishSelect = document.getElementById('finish');
    const foundationTypeSelect = document.getElementById('foundation_type');
    const mezzanineOptionSelect = document.getElementById('mezzanine_option');
    const rooftopOptionSelect = document.getElementById('rooftop_option');
    const roofTypeSelect = document.getElementById('roof_type');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');

    const estimatedCostDisplay = document.getElementById('estimatedCost');
    const costLoadingSpinner = document.getElementById('costLoadingSpinner');
    const costError = document.getElementById('costError');
    const emailNotification = document.getElementById('emailNotification');
    const ctxCostBreakdown = document.getElementById('costBreakdownChart').getContext('2d');

    // Initial chart setup (will be updated on calculation)
    let costBreakdownChart = new Chart(ctxCostBreakdown, {
        type: 'bar',
        data: {
            labels: ['Phần thô', 'Hoàn thiện', 'M&E', 'Thiết kế & Giấy phép', 'Dự phòng'],
            datasets: [{
                label: 'Phân bổ Chi phí',
                data: [0, 0, 0, 0, 0],
                backgroundColor: [
                    'rgba(251, 191, 36, 0.7)', /* Golden Yellow */
                    'rgba(245, 158, 11, 0.7)',  /* Orange-Yellow */
                    'rgba(217, 119, 6, 0.7)',   /* Darker Orange */
                    'rgba(180, 83, 9, 0.7)',    /* Brownish Orange */
                    'rgba(124, 45, 6, 0.7)'     /* Darkest Orange */
                ],
                borderColor: [
                    'rgb(251, 191, 36)',
                    'rgb(245, 158, 11)',
                    'rgb(217, 119, 6)',
                    'rgb(180, 83, 9)',
                    'rgb(124, 45, 6)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Tỷ lệ (%)',
                        color: '#3a3a3a' /* Dark text for chart axis title */
                    },
                    ticks: {
                        color: '#3a3a3a' /* Dark text for chart ticks */
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)' /* Light grid lines */
                    }
                },
                x: {
                    ticks: {
                        callback: function(value, index, values) {
                            const label = this.getLabelForValue(value);
                            if (label.length > 16) { // Wrap long labels
                                return label.split(' ').reduce((acc, word) => {
                                    if (acc[acc.length - 1].length + word.length + 1 > 16) {
                                        acc.push(word);
                                    } else {
                                        acc[acc.length - 1] += (acc[acc.length - 1] ? ' ' : '') + word;
                                    }
                                    return acc;
                                }, ['']);
                            }
                            return label;
                        },
                        color: '#3a3a3a' /* Dark text for chart ticks */
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)' /* Light grid lines */
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y + '%';
                            }
                            return label;
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Phân bổ Chi phí Ước tính (Tỷ lệ phần trăm)',
                    font: { size: 16, color: '#3a3a3a' } /* Dark text for chart title */
                }
            }
        }
    });

    estimatorForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent actual form submission

        const area = parseFloat(areaInput.value);
        const floors = parseInt(floorsInput.value);
        const style = styleSelect.value;
        const finish = finishSelect.value;
        const foundationType = foundationTypeSelect.value;
        const mezzanineOption = mezzanineOptionSelect.value;
        const rooftopOption = rooftopOptionSelect.value;
        const roofType = roofTypeSelect.value;
        const email = emailInput.value;
        const phone = phoneInput.value;

        if (isNaN(area) || area <= 0 || isNaN(floors) || floors <= 0) {
            costError.textContent = 'Vui lòng nhập diện tích và số tầng hợp lệ.';
            costError.classList.remove('hidden');
            emailNotification.classList.add('hidden');
            estimatedCostDisplay.textContent = '-- VNĐ';
            costBreakdownChart.data.datasets[0].data = [0, 0, 0, 0, 0];
            costBreakdownChart.update();
            return;
        } else {
            costError.classList.add('hidden');
        }

        costLoadingSpinner.style.display = 'block';
        estimatedCostDisplay.textContent = 'Đang tính toán...';
        emailNotification.classList.add('hidden');

        // Simulate calculation delay
        setTimeout(() => {
            let baseCostPerSqM = 5000000; // Base cost per square meter (VNĐ) for basic finish, modern style

            // Adjust for style
            if (style === 'neoclassical') {
                baseCostPerSqM *= 1.2; // 20% higher for neoclassical
            } else if (style === 'minimalist') {
                baseCostPerSqM *= 0.95; // 5% lower for minimalist (simpler details)
            }

            // Adjust for finish level
            if (finish === 'standard') {
                baseCostPerSqM *= 1.15; // 15% higher for standard finish
            } else if (finish === 'premium') {
                baseCostPerSqM *= 1.35; // 35% higher for premium finish
            }

            // Adjust for number of floors (foundation, structure complexity)
            let floorFactor = 1;
            if (floors === 2) floorFactor = 1.05;
            else if (floors === 3) floorFactor = 1.1;
            else if (floors === 4) floorFactor = 1.15;
            else if (floors > 4) floorFactor = 1.2; // Higher floors increase complexity

            // Adjust for foundation type
            let foundationFactor = 1;
            if (foundationType === 'strip') {
                foundationFactor = 1.05; // 5% higher for strip foundation
            } else if (foundationType === 'pile') {
                foundationFactor = 1.10; // 10% higher for pile foundation
            }
            baseCostPerSqM *= foundationFactor;

            // Adjust for mezzanine
            if (mezzanineOption === 'yes') {
                baseCostPerSqM *= 1.03; // 3% higher for mezzanine (simplified)
            }

            // Adjust for rooftop
            if (rooftopOption === 'yes') {
                baseCostPerSqM *= 1.02; // 2% higher for rooftop (simplified)
            }

            // Adjust for roof type
            let roofFactor = 1;
            if (roofType === 'thai') {
                roofFactor = 1.05; // 5% higher for Thai roof
            } else if (roofType === 'japanese') {
                roofFactor = 1.07; // 7% higher for Japanese for Japanese roof
            }
            baseCostPerSqM *= roofFactor;


            const totalEstimatedCost = (area * floors * baseCostPerSqM * floorFactor);

            // Hypothetical breakdown percentages (sum to 100%)
            let breakdownPercentages = {
                'basic': [40, 30, 15, 10, 5], // Thô, Hoàn thiện, M&E, Thiết kế, Dự phòng
                'standard': [35, 35, 15, 10, 5],
                'premium': [30, 40, 15, 10, 5]
            };
            const currentBreakdown = breakdownPercentages[finish] || breakdownPercentages['standard'];

            estimatedCostDisplay.textContent = `${totalEstimatedCost.toLocaleString('vi-VN')} VNĐ`;
            costBreakdownChart.data.datasets[0].data = currentBreakdown;
            costBreakdownChart.update();
            costLoadingSpinner.style.display = 'none';

            // Prepare and trigger mailto link
            const recipient = 'tankhanh345@gmail.com';
            const subject = `Yêu cầu Báo giá Xây dựng - ${phone}`;
            const body = `
Chào ESB Homes,

Tôi muốn yêu cầu báo giá chi tiết dựa trên các thông tin sau:

--- CHI TIẾT DỰ ÁN ---
- Email liên hệ: ${email}
- Số điện thoại: ${phone}
- Diện tích sàn: ${area} m²
- Số tầng: ${floors}
- Phong cách: ${styleSelect.options[styleSelect.selectedIndex].text}
- Mức độ hoàn thiện: ${finishSelect.options[finishSelect.selectedIndex].text}
- Loại móng: ${foundationTypeSelect.options[foundationTypeSelect.selectedIndex].text}
- Có tầng lửng: ${mezzanineOptionSelect.options[mezzanineOptionSelect.selectedIndex].text}
- Có sân thượng: ${rooftopOptionSelect.options[rooftopOptionSelect.selectedIndex].text}
- Loại mái: ${roofTypeSelect.options[roofTypeSelect.selectedIndex].text}

--- CHI PHÍ ƯỚC TÍNH SƠ BỘ ---
- Tổng chi phí: ${totalEstimatedCost.toLocaleString('vi-VN')} VNĐ

Vui lòng liên hệ lại với tôi qua email hoặc số điện thoại trên để tư vấn thêm.
Cảm ơn.
            `.trim().replace(/^\s+/gm, ''); // Trim and remove leading spaces on each line

            const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            emailNotification.textContent = 'Đã tính toán xong! Đang chuẩn bị mở trình gửi email của bạn...';
            emailNotification.classList.remove('hidden');

            setTimeout(() => {
                window.location.href = mailtoLink;
                emailNotification.classList.add('hidden');
            }, 2500); // Give user time to read the message

        }, 800); // Simulate network delay
    });

    // Navigation Logic
    const sections = document.querySelectorAll('section');
    const navLinksDesktop = document.querySelectorAll('#desktop-nav a');
    const navLinksMobile = document.querySelectorAll('#mobile-nav a');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinksDesktop.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
                navLinksMobile.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { rootMargin: '-30% 0px -70% 0px' });

    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

    const toggleMenu = () => {
        mobileMenu.classList.toggle('translate-y-full');
        mobileMenuOverlay.classList.toggle('hidden');
        mobileMenuOverlay.classList.toggle('opacity-0');
        mobileMenuOverlay.classList.toggle('opacity-50');
    };

    if (mobileMenuButton) { // Check if element exists before adding listener
        mobileMenuButton.addEventListener('click', toggleMenu);
    }
    if (mobileMenuOverlay) { // Check if element exists before adding listener
        mobileMenuOverlay.addEventListener('click', toggleMenu);
    }
    navLinksMobile.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
};
</script>

</body>
</html>
