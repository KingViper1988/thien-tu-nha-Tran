
import React from 'react';
import { MINISTRY_INFO } from '../constants';
import { Ministry } from '../types';

const TutorialSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-6">
        <h3 className="text-xl font-bold font-serif-display text-red-900 mb-2 border-b-2 border-red-800/20 pb-1">{title}</h3>
        <div className="space-y-2 text-stone-700 leading-relaxed">{children}</div>
    </div>
);

const TutorialPanel: React.FC = () => {
    return (
        <div className="p-1 font-serif-display">
            <TutorialSection title="Mục Tiêu (Objective)">
                <p>Trở thành một vị vua anh minh của Nhà Trần, trị vì đất nước trong 70 năm (từ 1225 đến 1295) để đạt đến thời kỳ hoàng kim. Triều đại của Bệ hạ sẽ sụp đổ nếu bất kỳ chỉ số quốc gia nào về 0, hoặc có quá nhiều đại thần mưu phản.</p>
            </TutorialSection>

            <TutorialSection title="Vòng Lặp Hàng Năm (Yearly Loop)">
                <p>Mỗi năm trị vì bao gồm 3 giai đoạn chính:</p>
                <ol className="list-decimal list-inside space-y-2 pl-4">
                    <li><strong>Phân Bổ Ngân Sách:</strong> Bệ hạ quyết định chi tiêu ngân khố cho 4 bộ (Binh, Hộ, Lễ, Hình) để định hướng phát triển đất nước trong năm.</li>
                    <li><strong>Buổi Chầu Triều:</strong> Bệ hạ sẽ nhận 4 tấu chương từ các quan. Mỗi quyết định sẽ ảnh hưởng trực tiếp đến các chỉ số quốc gia, mối quan hệ, quân sự, và ngoại giao.</li>
                    <li><strong>Biên Niên Sử:</strong> Cuối năm, các sử quan sẽ tổng hợp lại tất cả các quyết định và tình hình đất nước thành một trang sử. Sau đó, một năm mới sẽ bắt đầu.</li>
                </ol>
            </TutorialSection>

            <TutorialSection title="Các Chỉ Số Quốc Gia (National Stats)">
                <p>6 chỉ số cốt lõi thể hiện sức mạnh của Đại Việt. Nếu bất kỳ chỉ số nào giảm xuống 0, triều đại sẽ sụp đổ.</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                    <li><strong>Phồn Vinh:</strong> Sự giàu có và phát triển kinh tế. Ảnh hưởng đến thuế thu được hàng năm.</li>
                    <li><strong>Dân Sinh:</strong> Sự ấm no, hạnh phúc của người dân. Dân sinh thấp dễ gây bất ổn.</li>
                    <li><strong>Học Thức:</strong> Trình độ văn hóa, giáo dục. Cần cho việc tuyển mộ nhân tài.</li>
                    <li><strong>An Ninh:</strong> Sự ổn định trong nước và sức mạnh phòng thủ biên giới.</li>
                    <li><strong>Ngân Khố:</strong> Tiền bạc của quốc gia, dùng cho mọi hoạt động.</li>
                    <li><strong>Uy Tín:</strong> Uy danh của bệ hạ trong và ngoài nước.</li>
                </ul>
            </TutorialSection>
            
            <TutorialSection title="Quản Lý (Management Panels)">
                <ul className="list-disc list-inside space-y-2 pl-4">
                    <li><strong>Triều Thần:</strong> Theo dõi mối quan hệ với các quan đại thần. Bệ hạ có thể dùng 5 vạn quan để 'Mua chuộc', tăng 10 điểm trung thành cho một vị quan.</li>
                    <li><strong>Hậu Cung:</strong> Quản lý các phi tần. Mối quan hệ tốt có thể mang lại những lợi ích bất ngờ.</li>
                    <li><strong>Quân Sự:</strong> Xem xét sức mạnh và tinh thần của quân đội.</li>
                    <li><strong>Kế Vị:</strong> Theo dõi các hoàng tử, những người sẽ kế thừa ngai vàng.</li>
                    <li><strong>Ngoại Giao:</strong> Tình hình quan hệ với các nước láng giềng như Nhà Nguyên và Chiêm Thành.</li>
                    <li><strong>Trợ Giúp:</strong> Sử dụng các quyền trợ giúp khẩn cấp. Mỗi quyền chỉ có thể dùng một lần duy nhất để tăng 10 điểm cho một chỉ số tương ứng.</li>
                </ul>
            </TutorialSection>
        </div>
    );
};

export default TutorialPanel;
