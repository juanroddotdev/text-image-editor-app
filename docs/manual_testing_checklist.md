# Manual Testing Checklist: Text-Over-Image Creation

Use this checklist to systematically verify the text editing capabilities of the application. Please note any issues or unexpected behaviors as you go through these steps.

## 1. Setup & Initialization
- [ ] **Load Image**: Upload a standard image (JPG/PNG). Verify canvas loads.
- [ ] **Initial State**: Verify "Add Text" button is visible and enabled.
- [ ] **No Selection**: Verify styling controls (Color, Font, Size) are hidden when no text is selected.

## 2. Text Creation
- [ ] **Add Single Text**: Click "Add Text".
    - [ ] Text should appear at the center of the canvas.
    - [ ] Default text should be "Your Text Here" (or similar).
    - [ ] Default style: Inter font, ~30px size, Black color.
    - [ ] The new text should be automatically selected (controls appear).
- [ ] **Add Multiple Texts**: Click "Add Text" multiple times.
    - [ ] New text objects should be created.
    - [ ] Verify you can have 5+ text objects on screen.

## 3. Text Manipulation (Mouse/Touch)
- [ ] **Selection**: Click an unselected text object. It should become active (bounding box appears).
- [ ] **Deselection**: Click the empty canvas area. Text should be deselected (controls disappear).
- [ ] **Dragging**: Drag a text object. It should move smoothly following the cursor.
    - [ ] Drag to all 4 corners of the canvas.
    - [ ] Drag partially off-screen.
- [ ] **Resizing**: Drag the corner handles of the bounding box.
    - [ ] Text should scale up/down.
    - [ ] Aspect ratio should be preserved (unless shift-drag allows free transform).
- [ ] **Rotation**: Drag the rotation handle (usually top center).
    - [ ] Text should rotate smoothly.
    - [ ] Rotate 360 degrees.

## 4. Text Content Editing
- [ ] **Enter Edit Mode**: Double-click a text object.
    - [ ] Cursor should appear inside the text.
    - [ ] You should be able to type.
- [ ] **Typing**:
    - [ ] Type alphabetic characters (A-Z, a-z).
    - [ ] Type numbers (0-9).
    - [ ] Type special characters (!@#$%^&*).
    - [ ] Type emojis (😀).
- [ ] **Multiline**: Press `Enter` to create a new line.
    - [ ] Text should wrap or create a new line.
    - [ ] Alignment (Left/Center/Right) should work for multiline text.
- [ ] **Empty State**: Delete all text content and click away.
    - [ ] What happens? (Does it disappear? Stay as empty box? Revert to default?)

## 5. Styling Controls
*Select a text object before testing these.*

### Font Family
- [ ] **Change Font**: Cycle through all available fonts in the dropdown.
    - [ ] Inter
    - [ ] Roboto
    - [ ] Open Sans
    - [ ] Lato
    - [ ] Montserrat
    - [ ] Playfair Display
    - [ ] Bebas Neue
    - [ ] Pacifico
- [ ] **Consistency**: Verify the font changes immediately on the canvas.

### Color
- [ ] **Change Color**: Use the color picker to select a new color.
    - [ ] Test Red, Green, Blue.
    - [ ] Test White and Black.
- [ ] **Hex Input**: If available, manually type a hex code (e.g., `#FF5733`).

### Font Size
- [ ] **Slider Interaction**: Drag the slider. Text size should update in real-time.
- [ ] **Min Limit**: Drag to minimum (8px). Text should be readable but small.
- [ ] **Max Limit**: Drag to maximum (200px). Text should be very large.
- [ ] **Input**: If there's a number input, type a value (e.g., `50`).

### Alignment (If implemented)
- [ ] **Left Align**: Standard left alignment.
- [ ] **Center Align**: Center alignment (most visible with multiline text).
- [ ] **Right Align**: Right alignment.

## 6. Object Management
- [ ] **Switching Selection**: Click Text A, change color to Red. Click Text B, change color to Blue.
    - [ ] Verify Text A stays Red.
    - [ ] Verify Text B becomes Blue.
- [ ] **Deletion**: Select a text object and click the "Delete" (Trash) button.
    - [ ] Object should disappear.
    - [ ] Controls should disappear (since nothing is selected).

## 7. Edge Cases & Stress Tests
- [ ] **Long Text**: Type a very long string (e.g., 100+ characters) without spaces.
    - [ ] Does it break the layout?
    - [ ] Does it go off-canvas?
- [ ] **Canvas Boundaries**: Drag text completely off the canvas and release.
    - [ ] Can you get it back? (Is it lost forever?)
- [ ] **Zero Size**: Try to resize the text to 0px width/height using handles.
    - [ ] Does it crash or disappear?
- [ ] **Rapid Clicks**: Click "Add Text" button rapidly 10 times.
    - [ ] Does the app handle it gracefully?

## 8. Export Verification
- [ ] **Download**: Click "Download Image".
- [ ] **Verify Output**: Open the downloaded PNG.
    - [ ] Are all text objects present?
    - [ ] Are positions correct?
    - [ ] Are fonts, colors, and sizes correct?
    - [ ] Is the background image correct?
    - [ ] Is the resolution high quality?

## 9. Gesture Mocking (Desktop / Trackpad)
*These features simulate mobile gestures using modifier keys and dragging.*
- [ ] **Pinch Zoom Simulation (Scale)**: Select a text object, hold `Option` (Alt), and drag the cursor Up/Down.
    - [ ] Drag Up: Object should shrink.
    - [ ] Drag Down: Object should grow.
    - [ ] Movement should be smooth.
- [ ] **Rotate Simulation**: Select a text object, hold `Control`, and drag the cursor Left/Right.
    - [ ] Drag Left: Object should rotate counter-clockwise.
    - [ ] Drag Right: Object should rotate clockwise.
    - [ ] Rotation should follow cursor movement.

## 10. Mobile Testing Setup
*Use this method to test on a physical phone with developer tools.*

### Local Network Access
1.  **Start Server**: Run `npm run dev` (it now includes `--host`).
2.  **Find URL**: Look for `Network: http://192.168.x.x:5173` in the terminal output.
3.  **Connect**: Type that exact URL into your phone's browser (Chrome/Safari).
4.  **Requirement**: Phone and computer must be on the same Wi-Fi.

### Remote Debugging (Android/Chrome)
1.  Connect phone to computer via USB.
2.  Enable **USB Debugging** in Android Developer Options.
3.  On computer, open Chrome and go to `chrome://inspect/#devices`.
4.  You will see your phone's open tabs. Click **"Inspect"** to open a full DevTools window for your phone.

