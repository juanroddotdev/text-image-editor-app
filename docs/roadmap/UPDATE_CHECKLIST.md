# Roadmap Update Checklist

**Quick Reference Card** - Print this or keep it open when completing items

---

## ✅ When Completing a Roadmap Item

### Step 1: Move to Completed
- [ ] Move from `planned/*.md` → `completed/[architecture|features].md`
- [ ] Mark status as ✅ **COMPLETE**
- [ ] Add completion date (YYYY-MM-DD)
- [ ] Add brief implementation summary
- [ ] List files modified/created

### Step 2: Update Dashboard
- [ ] Open `README.md`
- [ ] Increment completed count (e.g., "18 items" → "19 items")
- [ ] Update completion percentage if needed
- [ ] Update Key Metrics table if category changes

### Step 3: Update Active Work
- [ ] Open `active/current.md`
- [ ] Remove from "Currently In Progress" (if listed)
- [ ] Add to "Recently Completed" section with date

### Step 4: Update Changelog
- [ ] Open `changelog.md`
- [ ] Add entry under latest version (or create new version)
- [ ] Include: Item number, name, completion date, brief description

### Step 5: Update Phases (if applicable)
- [ ] Open `phases.md`
- [ ] Find phase containing the item
- [ ] Mark item with ✅
- [ ] Update phase status if all items complete

### Step 6: Remove from Planned
- [ ] Open `planned/high-priority.md` (or medium/future)
- [ ] Remove item OR mark as ✅ COMPLETE with link to completed file

### Step 7: Verify
- [ ] Check all links work
- [ ] Verify no duplicate entries
- [ ] Confirm statistics add up correctly

---

## 📍 File Locations

| Update This | File Path |
|-------------|-----------|
| Item details | `completed/architecture.md` or `features.md` |
| Statistics | `README.md` (Quick Status Dashboard) |
| Active status | `active/current.md` |
| Version history | `changelog.md` |
| Phase status | `phases.md` |
| Remove from planned | `planned/high-priority.md` or `medium-priority.md` or `future.md` |

---

## 🚨 Common Mistakes

- ❌ Forgetting to update statistics in README
- ❌ Leaving item in both planned AND completed
- ❌ Not updating changelog
- ❌ Breaking cross-references
- ❌ Not removing from active work

---

## 📝 Quick Format Reference

### Completed Item Format
```markdown
### [Item Number]. [Item Name]
- **Status**: ✅ **COMPLETE**
- **Completion Date**: YYYY-MM-DD
- **Implementation**: [Brief summary]
- **Files Modified**: [List of files]
- **Files Created**: [List of files if any]
```

### Recently Completed Format
```markdown
- ✅ [Item Name] - [Brief description] (Completed: YYYY-MM-DD)
```

---

**Full Guide**: See roadmap files for detailed examples

