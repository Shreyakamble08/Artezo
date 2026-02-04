// ==================== ASIN-STYLE VARIANT SYSTEM + DYNAMIC PRICING ====================

// 1. VARIANT DATA – prices/mrp/discount as NUMBERS only (no ₹ or %)
const variantCatalog = {
  "ASIN-B0FRAME002": {
    id: "ASIN-B0FRAME002",
    name: "2 Frames Set",
    frameCount: 2,
    price: 518,
    mrp: 1199,
    discount: 57,
    previewImage: "images/2frame-3.jfif",
    isDefault: false,
    mainImage: "images/2frame-1.jfif",
    thumbnails: [
      "images/2frame-1.jfif",
      "images/2frame-2.jfif",
      "images/2frame-3.jfif",
      "images/frame4.jfif",
    ],
    specs: {
      customisations: "2 images",
      colour: "2 Vertical",
      dimensions: "32L x 24.5W cm",
    },
  },
  "ASIN-B0FRAME004": {
    id: "ASIN-B0FRAME004",
    name: "4 Frames Set",
    frameCount: 4,
    price: 864,
    mrp: 1999,
    discount: 57,
    previewImage: "images/4frame-3.jfif",
    isDefault: true,
    mainImage: "images/4frame-3.jfif",
    thumbnails: [
      "images/4frame-3.jfif",
      "images/4frame-2.jfif",
      "images/4frame-1.jfif",
      "images/4frame-4.jfif",
    ],
    specs: {
      customisations: "4 images",
      colour: "4 Vertical",
      dimensions: "32L x 24.5W cm",
    },
  },
  "ASIN-B0FRAME005": {
    id: "ASIN-B0FRAME005",
    name: "5 Frames Set",
    frameCount: 5,
    price: 1199,
    mrp: 2499,
    discount: 52,
    previewImage: "images/5frame-1.jfif",
    isDefault: false,
    mainImage: "images/5frame-1.jfif",
    thumbnails: [
      "images/5frame-1.jfif",
      "images/5frame-2.jfif",
      "images/5frame-3.jfif",
      "images/5frame-4.jfif",
    ],
    specs: {
      customisations: "5 images",
      colour: "Collage Style",
      dimensions: "40L x 30W cm",
    },
  },
  "ASIN-B0FRAME008": {
    id: "ASIN-B0FRAME008",
    name: "7 Frames Set",
    frameCount: 7,
    price: 1499,
    mrp: 2999,
    discount: 50,
    isDefault: false,
    previewImage: "images/7frame-1.jfif",
    mainImage: "images/7frame-1.jfif",
    thumbnails: [
      "images/7frame-1.jfif",
      "images/7frame-2.jfif",
      "images/7frame-3.jfif",
      "images/7frame-4.jfif",
    ],
    specs: {
      customisations: "8 images",
      colour: "Gallery Wall",
      dimensions: "50L x 40W cm",
    },
  },
  "ASIN-B0FRAME009": {
    id: "ASIN-B0FRAME009",
    name: "8 Frames Set",
    frameCount: 8,
    price: 1999,
    mrp: 3499,
    discount: 43,
    isDefault: false,
    previewImage: "images/8frame-1.jfif",
    mainImage: "images/8frame-1.jfif",
    thumbnails: [
      "images/8frame-1.jfif",
      "images/8frame-2.jfif",
      "images/8frame-3.jfif",
      "images/8frame-4.jfif",
    ],
    specs: {
      customisations: "8 images",
      colour: "Gallery Wall",
      dimensions: "50L x 40W cm",
    },
  },
  "ASIN-B0FRAME0010": {
    id: "ASIN-B0FRAME0010",
    name: "9 Frames Set",
    frameCount: 9,
    price: 2499,
    mrp: 3999,
    discount: 50,
    isDefault: false,
    previewImage: "images/9frame-1.jfif",
    mainImage: "images/9frame-1.jfif",
    thumbnails: [
      "images/9frame-1.jfif",
      "images/9frame-2.jfif",
      "images/9frame-3.jfif",
      "images/9frame-4.jfif",
    ],
    specs: {
      customisations: "8 images",
      colour: "Gallery Wall",
      dimensions: "50L x 40W cm",
    },
  },
};

// 2. STATE
let activeVariantId = null;

// 3. PRICE FORMAT HELPERS
function formatPrice(num) {
  return "₹" + num.toLocaleString("en-IN");
}

function formatMrp(num) {
  return "₹" + num.toLocaleString("en-IN");
}

function formatDiscount(num) {
  return num + "% OFF";
}

// 4. INIT
document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 DOM Loaded - Initializing variant + pricing + magnifier");

  renderVariantCards();
  setDefaultVariant();
  initQuantitySelector();
  setTimeout(() => initMagnifier(), 100);

  console.log("✅ System initialized");
});

// 5. RENDER VARIANT CARDS
function renderVariantCards() {
  const container = document.getElementById("variantCardsContainer");
  if (!container) return;

  container.innerHTML = "";

  Object.values(variantCatalog).forEach((variant) => {
    const card = document.createElement("div");
    card.className = `frame-set-card border border-gray-200 rounded-lg p-2 cursor-pointer transition-all duration-200 bg-white hover:border-orange-300 hover:shadow-sm w-28 ${variant.isDefault ? "border-orange-500 bg-orange-50" : ""}`;
    card.dataset.asinId = variant.id;
    card.innerHTML = `
      <div class="frame-preview mb-1.5 flex items-center justify-center h-14 bg-gray-50 rounded-md overflow-hidden border border-gray-100">
        <img src="${variant.previewImage}" alt="${variant.frameCount} Frames" class="w-full h-full object-contain"
             onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'text-gray-400 text-[10px] text-center p-1\\'>Preview</div>';">
      </div>
      <div class="frame-details text-center">
        <div class="font-medium text-xs text-gray-900 mb-0.5">${variant.frameCount} Frames</div>
      </div>
      <div class="mt-1.5 text-center">
        <div class="flex items-baseline justify-center gap-0.5">
          <span class="text-xs font-bold text-gray-900">${formatPrice(variant.price)}</span>
          <span class="text-[10px] line-through text-gray-400">${formatMrp(variant.mrp)}</span>
        </div>
        <div class="mt-0.5">
          <span class="inline-block bg-red-50 text-red-700 px-1.5 py-0.5 rounded-full text-[10px] font-medium">
            ${formatDiscount(variant.discount)}
          </span>
        </div>
      </div>
    `;
    card.addEventListener("click", () => selectVariant(variant.id));
    container.appendChild(card);
  });
}

// 6. UPDATE CARD ACTIVE STYLE
function updateVariantCardStates(activeAsinId) {
  document.querySelectorAll(".frame-set-card").forEach((card) => {
    const isActive = card.dataset.asinId === activeAsinId;
    if (isActive) {
      card.classList.add("border-orange-500", "bg-orange-50", "shadow-sm");
      card.classList.remove("border-gray-200");
    } else {
      card.classList.remove("border-orange-500", "bg-orange-50", "shadow-sm");
      card.classList.add("border-gray-200");
    }
  });
}

// 7. DEFAULT VARIANT
function setDefaultVariant() {
  const def = Object.values(variantCatalog).find((v) => v.isDefault);
  if (def) selectVariant(def.id);
}

// 8. SELECT VARIANT (core)
function selectVariant(asinId) {
  const variant = variantCatalog[asinId];
  if (!variant) return;

  activeVariantId = asinId;
  updateVariantCardStates(asinId);

  updateMainImage(variant.mainImage);
  updateThumbnails(variant.thumbnails);
  updateProductDetails(variant);
  updatePriceDisplay(variant); // ← key pricing sync
  updateCustomizeButton(variant.frameCount);

  if (isCustomizeModalOpen()) {
    syncCustomizationSection(variant.frameCount);
  }
}

// 9. CENTRAL PRICE UPDATE (main page + modal)
function updatePriceDisplay(variant) {
  // Main buy box
  const mainPrice = document.querySelector(
    ".lg\\:w-7\\/12 .text-3xl.font-bold.text-\\[\\#174143\\]",
  );
  const mainMrp = document.querySelector(
    ".lg\\:w-7\\/12 .text-sm.line-through.text-gray-400",
  );
  const mainDiscount = document.querySelector(
    ".lg\\:w-7\\/12 .bg-red-50.text-red-700",
  );

  if (mainPrice) mainPrice.textContent = formatPrice(variant.price);
  if (mainMrp) mainMrp.textContent = formatMrp(variant.mrp);
  if (mainDiscount) mainDiscount.textContent = formatDiscount(variant.discount);

  // Modal
  const modalPrice = document.querySelector(
    "#customiseModal .text-2xl.font-bold.text-gray-900.",
  );
  const modalMrp = document.querySelector(
    "#customiseModal .text-base.line-through.text-gray-400",
  );
  const modalDiscount = document.querySelector(
    "#customiseModal .bg-red-100.text-red-700",
  );

  if (modalPrice)
    modalPrice.innerHTML =
      formatPrice(variant.price) +
      '<span class="text-base font-normal">.00</span>';
  if (modalMrp) modalMrp.textContent = formatMrp(variant.mrp);
  if (modalDiscount)
    modalDiscount.textContent = formatDiscount(variant.discount);
}

// 10. MAIN IMAGE
function updateMainImage(src) {
  const mainImg = document.getElementById("mainImg");
  const zoomed = document.getElementById("zoomedImage");
  if (mainImg) {
    mainImg.src = src;
    mainImg.style.opacity = "0";
    setTimeout(() => {
      mainImg.style.opacity = "1";
    }, 10);
  }
  if (zoomed) zoomed.src = src;
  updateMagnifierOnImageChange();
}

// 11. THUMBNAILS (vertical + grid)
function updateThumbnails(thumbnails) {
  // Vertical
  const vert = document.querySelector(".flex.flex-col.gap-3");
  if (vert) {
    vert.innerHTML = "";
    thumbnails.forEach((src, i) => {
      const img = document.createElement("img");
      img.src = src;
      img.className = `thumbnail h-20 w-20 object-cover rounded-lg cursor-pointer border ${i === 0 ? "border-2 border-orange-500" : "border-gray-300 hover:border-orange-400"}`;
      img.onclick = () => onThumbnailClick(img, i);
      vert.appendChild(img);
    });
  }

  // Grid
  const grid = document.querySelector(".grid.grid-cols-4.gap-2");
  if (grid) {
    grid.innerHTML = "";
    thumbnails.forEach((src, i) => {
      const img = document.createElement("img");
      img.src = src;
      img.className = `w-full h-24 object-cover rounded-lg border ${i === 0 ? "border-orange-500" : "border-gray-200 hover:border-gray-300"} cursor-pointer`;
      img.onclick = () => onThumbnailClick(img, i);
      grid.appendChild(img);
    });
  }
}

function onThumbnailClick(thumb, index) {
  if (!activeVariantId) return;
  const v = variantCatalog[activeVariantId];
  updateMainImage(v.thumbnails[index]);
  updateThumbnailSelection(index);
}

function updateThumbnailSelection(activeIndex) {
  document
    .querySelectorAll(".thumbnail, .grid.grid-cols-4.gap-2 img")
    .forEach((el, i) => {
      const isActive = i === activeIndex;
      if (el.classList.contains("thumbnail")) {
        el.classList.toggle("border-2", isActive);
        el.classList.toggle("border-orange-500", isActive);
        el.classList.toggle("border-gray-300", !isActive);
      } else {
        el.classList.toggle("border-orange-500", isActive);
        el.classList.toggle("border-gray-200", !isActive);
      }
    });
}

// 12. PRODUCT DETAILS
function updateProductDetails(variant) {
  const cont = document.querySelector(
    ".flex.flex-wrap.gap-4.font-normal.text-sm.text-\\[\\#174143\\]",
  );
  if (cont) {
    cont.innerHTML = `
      <span><strong>Customisations:</strong> ${variant.specs.customisations}</span>
      <span><strong>Brand:</strong> Artezo</span>
      <span><strong>Colour:</strong> ${variant.specs.colour}</span>
      <span><strong>Product Dimensions:</strong> ${variant.specs.dimensions}</span>
      <span><strong>Shape:</strong> Rectangular</span>
      <span><strong>Mounting Type:</strong> Wall Mount</span>
    `;
  }
}

// 13. CUSTOMIZE BUTTON
function updateCustomizeButton(frameCount) {
  const btn = document.querySelector('button[onclick^="openCustomizeModal"]');
  if (btn) btn.setAttribute("onclick", `openCustomizeModal(${frameCount})`);
}

// 14. QUANTITY SELECTOR
function initQuantitySelector() {
  const val = document.getElementById("qtyValue");
  const plus = document.getElementById("qtyPlus");
  const minus = document.getElementById("qtyMinus");
  if (!val || !plus || !minus) return;

  let qty = 1;
  plus.onclick = () => {
    qty++;
    val.textContent = qty;
  };
  minus.onclick = () => {
    if (qty > 1) {
      qty--;
      val.textContent = qty;
    }
  };
}

// 15. CUSTOMIZE MODAL
function openCustomizeModal(frameCount) {
  if (!frameCount && activeVariantId) {
    frameCount = variantCatalog[activeVariantId]?.frameCount || 4;
  }

  const modal = document.getElementById("customiseModal");
  if (!modal) return;

  modal.classList.remove("hidden");
  modal.classList.add("flex");

  setTimeout(() => {
    syncCustomizationSection(frameCount);
    if (activeVariantId) {
      const v = variantCatalog[activeVariantId];
      if (v) updatePriceDisplay(v); // ensure modal price is correct
    }
  }, 10);
}

function closeCustomizeModal() {
  const modal = document.getElementById("customiseModal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
  clearUploadedImages();
}

function isCustomizeModalOpen() {
  const m = document.getElementById("customiseModal");
  return m && m.classList.contains("flex");
}

function syncCustomizationSection(frameCount) {
  updateFramePreviewSlots(frameCount);
  updateUploadInputs(frameCount);
}

function updateFramePreviewSlots(count) {
  const cont = document.getElementById("framePreview");
  if (!cont) return;
  cont.innerHTML = "";

  let cols =
    count <= 2
      ? "grid-cols-2"
      : count <= 4
        ? "grid-cols-2"
        : count <= 6
          ? "grid-cols-3"
          : "grid-cols-4";
  cont.className = `grid ${cols} gap-4 max-w-md mx-auto`;

  for (let i = 1; i <= count; i++) {
    const slot = document.createElement("div");
    slot.className =
      "frame-preview-slot relative border-4 border-black aspect-video bg-gray-100";
    slot.innerHTML = `<img id="frameImg-${i}" class="absolute inset-0 w-full h-full object-cover hidden">`;
    cont.appendChild(slot);
  }
}

function updateUploadInputs(count) {
  const cont = document.getElementById("uploadContainer");
  if (!cont) return;
  cont.innerHTML = "";

  for (let i = 1; i <= count; i++) {
    const div = document.createElement("div");
    div.className = "border rounded-lg p-4 mb-4";
    div.innerHTML = `
      <h3 class="font-medium text-sm mb-1"><span class="text-red-500">*</span> Upload your high quality photo ${i}</h3>
      <p class="text-xs text-gray-600 mb-3">Upload JPEG or PNG (max 15MB).</p>
      <div id="uploadBox-${i}">
        <label class="inline-flex items-center gap-2 border px-4 py-2 rounded cursor-pointer">
          <input type="file" hidden accept="image/*" onchange="handleUpload(event, ${i})">
          <i class="fas fa-upload"></i> Upload
        </label>
      </div>
    `;
    cont.appendChild(div);
  }
}

function handleUpload(e, index) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const img = document.getElementById(`frameImg-${index}`);
    img.src = reader.result;
    img.classList.remove("hidden");

    document.getElementById(`uploadBox-${index}`).innerHTML = `
      <div class="flex items-center gap-3">
        <img src="${reader.result}" class="w-16 h-16 rounded object-cover border">
        <button onclick="replaceImage(${index})" class="border px-3 py-1 rounded text-sm">Replace</button>
        <button onclick="deleteImage(${index})" class="text-sm text-red-600">Delete</button>
        <input id="replace-${index}" type="file" hidden accept="image/*" onchange="handleUpload(event, ${index})">
      </div>
    `;
  };
  reader.readAsDataURL(file);
}

function replaceImage(index) {
  document.getElementById(`replace-${index}`).click();
}

function deleteImage(index) {
  const img = document.getElementById(`frameImg-${index}`);
  img.classList.add("hidden");
  img.src = "";
  document.getElementById(`uploadBox-${index}`).innerHTML = `
    <label class="inline-flex items-center gap-2 border px-4 py-2 rounded cursor-pointer">
      <input type="file" hidden accept="image/*" onchange="handleUpload(event, ${index})">
      <i class="fas fa-upload"></i> Upload
    </label>
  `;
}

function clearUploadedImages() {
  document
    .querySelectorAll('input[type="file"]')
    .forEach((inp) => (inp.value = ""));
  document.querySelectorAll(".frame-preview-slot img").forEach((img) => {
    img.classList.add("hidden");
    img.src = "";
  });
  document.querySelectorAll('[id^="uploadBox-"]').forEach((box) => {
    const idx = box.id.split("-")[1];
    box.innerHTML = `
      <label class="inline-flex items-center gap-2 border px-4 py-2 rounded cursor-pointer">
        <input type="file" hidden accept="image/*" onchange="handleUpload(event, ${idx})">
        <i class="fas fa-upload"></i> Upload
      </label>
    `;
  });
}

function scrollToPreview() {
  document
    .getElementById("framePreview")
    ?.scrollIntoView({ behavior: "smooth" });
}

// 16. MAGNIFIER (your original code – kept mostly as-is)
let magnifierEnabled = true;
let isMagnifierActive = false;

function initMagnifier() {
  const img = document.getElementById("mainImg");
  const cont = document.getElementById("imageContainer");
  if (!img || !cont) return;

  // Lens
  if (!document.getElementById("magnifierLens")) {
    const lens = document.createElement("div");
    lens.id = "magnifierLens";
    lens.className =
      "absolute hidden w-32 h-32 rounded-full border-2 border-white shadow-lg overflow-hidden pointer-events-none z-20";
    lens.innerHTML =
      '<div id="lensPreview" class="w-full h-full bg-no-repeat"></div>';
    cont.appendChild(lens);
  }

  // Zoom box
  if (!document.getElementById("zoomPreviewBox")) {
    const box = document.createElement("div");
    box.id = "zoomPreviewBox";
    box.className =
      "absolute left-full ml-4 top-0 w-80 h-80 hidden bg-white border border-gray-300 rounded-lg shadow-xl overflow-hidden z-10";
    box.innerHTML =
      '<img id="zoomedImage" src="" class="absolute transform scale-200 origin-top-left">';
    cont.parentElement.appendChild(box);
  }

  // Toggle button
  if (!document.getElementById("toggleZoomBtn")) {
    const btn = document.createElement("button");
    btn.id = "toggleZoomBtn";
    btn.className =
      "absolute bottom-3 right-3 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow";
    btn.innerHTML = '<i class="fas fa-search-plus text-gray-600"></i>';
    btn.onclick = toggleMagnifier;
    cont.appendChild(btn);
  }

  bindMagnifierToImage(img);
}

function bindMagnifierToImage(imageElement) {
  const cont = document.getElementById("imageContainer");
  const lens = document.getElementById("magnifierLens");
  const box = document.getElementById("zoomPreviewBox");
  const zoomed = document.getElementById("zoomedImage");

  cont.onmouseenter = () => {
    if (!magnifierEnabled) return;
    isMagnifierActive = true;
    lens.classList.remove("hidden");
    box.classList.remove("hidden");
  };

  cont.onmouseleave = () => {
    isMagnifierActive = false;
    lens.classList.add("hidden");
    box.classList.add("hidden");
  };

  cont.onmousemove = (e) => {
    if (!isMagnifierActive || !magnifierEnabled) return;

    const rect = cont.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const lensSize = 128;
    let lensX = x - lensSize / 2;
    let lensY = y - lensSize / 2;

    lensX = Math.max(0, Math.min(lensX, rect.width - lensSize));
    lensY = Math.max(0, Math.min(lensY, rect.height - lensSize));

    lens.style.left = lensX + "px";
    lens.style.top = lensY + "px";

    const zoom = 2;
    const lensPreview = document.getElementById("lensPreview");
    lensPreview.style.backgroundImage = `url('${imageElement.src}')`;
    lensPreview.style.backgroundSize = `${rect.width * zoom}px ${rect.height * zoom}px`;
    lensPreview.style.backgroundPosition = `-${lensX * zoom}px -${lensY * zoom}px`;

    zoomed.style.transform = `scale(${zoom})`;
    zoomed.style.left = `-${lensX * zoom}px`;
    zoomed.style.top = `-${lensY * zoom}px`;
  };
}

function toggleMagnifier() {
  magnifierEnabled = !magnifierEnabled;
  const btn = document.getElementById("toggleZoomBtn");
  if (btn) {
    btn.innerHTML = magnifierEnabled
      ? '<i class="fas fa-search-plus text-gray-600"></i>'
      : '<i class="fas fa-search-plus text-gray-300"></i>';
  }
}

function updateMagnifierOnImageChange() {
  const img = document.getElementById("mainImg");
  if (img) bindMagnifierToImage(img);
}

// 17. BACKWARD COMPAT (thumbnail onclick)
function changeImage(element) {
  const thumbs = Array.from(document.querySelectorAll(".thumbnail"));
  const idx = thumbs.indexOf(element);
  if (idx !== -1) onThumbnailClick(element, idx);
}

console.log("Full dynamic pricing & feature script loaded ✓");
