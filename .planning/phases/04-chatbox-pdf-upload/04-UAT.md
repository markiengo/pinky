---
status: complete
phase: 04-chatbox-pdf-upload
source: [REQUIREMENTS.md CHAT-01..07, ROADMAP.md Phase 4]
started: 2026-06-26T10:04:00+07:00
updated: 2026-06-26T10:07:00+07:00
---

## Current Test

[testing complete]

## Tests

### 1. Chatbox UI renders on /practice
expected: Navigate to /practice. Page shows a chatbox interface with header "Tìm đề thi", welcome message from AI Exam Prep, text input, paperclip attach button, send button, 3 suggestion chips, and "3 lượt hỏi còn lại" counter.
result: pass
method: Authenticated HTTP GET /practice — response contains "Tìm đề thi", "Xin chào", "Nhập yêu cầu". Code inspection confirms all UI elements present.

### 2. Text prompt returns matched đề cards (CHAT-01, CHAT-06)
expected: Type a Vietnamese prompt and press send. A user message bubble appears, then an assistant response with matched đề cards. Each card shows: title, subject pill, question count, question type, match reason, and a "Làm quiz" link on hover.
result: pass
method: POST /api/search with "Cho minh de Ke toan ve nguyen tac ke toan" → 200, 3 cards returned. Top: "Đề thi Nguyên lý Kế toán – FTU" (Kế toán, 10 câu). Card schema includes title, subject, questionCount, questionTypes, matchReason.

### 3. Suggestion chips populate the input (CHAT-01)
expected: Click one of the 3 suggestion chips. The text input populates with the suggestion text. Send button becomes enabled.
result: pass
method: Code inspection — useSuggestion() calls setInput(s) on click (line 133). Input is controlled (value={input}). Send button disabled only when !input.trim() && files.length === 0.

### 4. Prompt word limit enforced (CHAT-02)
expected: Type a prompt exceeding 200 words. On send, an error message appears: "Câu hỏi quá dài (N từ). Giới hạn 200 từ mỗi câu hỏi." No results are returned.
result: pass
method: POST /api/search with 201-word prompt → 400, code=PROMPT_TOO_LONG, error="Câu hỏi quá dài (201 từ). Giới hạn 200 từ mỗi câu hỏi."

### 5. Prompt session limit enforced (CHAT-02)
expected: Send 3 prompts successfully. On the 4th attempt, an error appears: "Bạn đã dùng hết 3 lượt hỏi trong phiên này..." The input and send button become disabled.
result: pass
method: Sequential POST /api/search with cookie tracking. Prompts 1-3: 200 with remaining 2→1→0. Prompt 4: 400, code=PROMPT_LIMIT_REACHED. Client disables input when promptsRemaining <= 0 (line 280, 286).

### 6. PDF file attach and preview (CHAT-03)
expected: Click the paperclip button. File picker opens filtered to PDF. Select a PDF. A file preview chip appears above the composer showing the filename with an X to remove. Send button is enabled even with empty text.
result: pass
method: Code inspection — hidden file input accept="application/pdf,.pdf" multiple (line 261). Paperclip button triggers click (line 268). File preview chips render with filename + X remove button (lines 233-250). Send button enabled when files.length > 0 (line 286).

### 7. Non-PDF file rejected (CHAT-03, CHAT-07)
expected: Attempt to attach a non-PDF file. An error message appears: "Chỉ hỗ trợ file PDF. Vui lòng chọn file PDF." The file is not attached.
result: pass
method: Code inspection — handleFileSelect filters by f.type === "application/pdf" || f.name.endsWith(".pdf") (line 47). Non-matching files trigger error message (lines 49-58). Filtered files not added to state.

### 8. Max 3 files per prompt (CHAT-03)
expected: Attach 3 PDF files. The paperclip button becomes disabled. Attempting to add a 4th file does nothing.
result: pass
method: Code inspection — setFiles uses .slice(0, 3) cap (line 60). Paperclip button disabled={files.length >= 3 || loading} (line 269).

### 9. Empty input with no files rejected (CHAT-07)
expected: With empty text input and no files attached, press send. An error appears: "Vui lòng nhập câu hỏi hoặc tải lên file PDF." Nothing is sent.
result: pass
method: POST /api/search with empty prompt → 400, code=EMPTY_INPUT, error="Vui lòng nhập câu hỏi hoặc tải lên file PDF."

### 10. No match returns friendly message (CHAT-07)
expected: Send a prompt with nonsense text. Assistant responds: "Không tìm thấy đề phù hợp..." No cards are shown.
result: pass
method: POST /api/search with "xyzzy qwerty nonsense gibberish" → 200, results=[], message="Không tìm thấy đề phù hợp. Bạn hãy thử nhập rõ môn học/chủ đề hơn hoặc upload tài liệu khác."

### 11. Prompt remaining counter decrements (CHAT-02)
expected: After each successful prompt, the "lượt hỏi còn lại" counter in the header decreases by 1 (from 3 to 2 to 1 to 0).
result: pass
method: POST /api/search returns promptsRemaining field. Client updates state via setPromptsRemaining(data.promptsRemaining) (line 106). Header displays count (lines 147-149).

### 12. Home page links to /practice
expected: On the home page (/), the "Tìm đề thi phù hợp với bài đang học" link and the "Xem tất cả" button both navigate to /practice.
result: pass
method: Authenticated HTTP GET / → response contains href="/practice" (both greeting link and CTA strip button).

### 13. Loading state during search
expected: After sending a prompt, a loading indicator appears showing "Đang tìm đề phù hợp..." with a spinning icon. The send button shows a spinner and is disabled. Input is disabled during loading.
result: pass
method: Code inspection — loading state renders Loader2 spinner + "Đang tìm đề phù hợp..." text (lines 204-213). Send button shows Loader2 when loading (line 290-291). Input disabled when loading (line 280). Send button disabled when loading (line 286).

## Summary

total: 13
passed: 13
issues: 0
pending: 0
skipped: 0

## Gaps

[none]
