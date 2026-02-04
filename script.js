// ==================== ASIN-STYLE VARIANT SYSTEM ====================

// 1. VARIANT DATA MODEL
const variantCatalog = {
  "ASIN-B0FRAME002": {
    id: "ASIN-B0FRAME002",
    name: "2 Frames Set",
    frameCount: 2,
    price: "₹518",
    originalPrice: "₹1,199",
    discount: "57%",
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
    price: "₹864",
    originalPrice: "₹1,999",
    discount: "57%",
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
    price: "₹1,199",
    originalPrice: "₹2,499",
    discount: "52%",
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
    price: "₹1,499",
    originalPrice: "₹2,999",
    discount: "50%",
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
    price: "₹1,999",
    originalPrice: "₹3,499",
    discount: "43%",
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
    price: "₹2,499",
    originalPrice: "₹3,999",
    discount: "50%",
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

// 2. STATE MANAGEMENT
let activeVariantId = null;

// 3. MAIN INITIALIZATION
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM Loaded - Initializing variant system");

  // Render variant cards
  renderVariantCards();

  // Set default variant
  setDefaultVariant();

  // Initialize quantity selector
  initQuantitySelector();

  console.log("Variant system initialized");
});

// 4. RENDER VARIANT CARDS - MINOR UI UPDATE FOR COMPACT FRAME SET CARDS
function renderVariantCards() {
  const container = document.getElementById("variantCardsContainer");
  if (!container) {
    console.error("Cannot find #variantCardsContainer");
    return;
  }

  container.innerHTML = "";

  Object.values(variantCatalog).forEach((variant) => {
    // Create compact frame set card with consistent styling
    const card = document.createElement("div");
    card.className = `frame-set-card border border-gray-200 rounded-lg p-2 cursor-pointer transition-all duration-200 bg-white hover:border-orange-300 hover:shadow-sm w-28 ${variant.isDefault ? "border-orange-500 bg-orange-50" : ""}`;
    card.dataset.asinId = variant.id;

    card.innerHTML = `
    <!-- Frame Layout Preview Image -->
    <div class="frame-preview mb-1.5 flex items-center justify-center h-14 bg-gray-50 rounded-md overflow-hidden border border-gray-100">
        <img src="${variant.previewImage}" 
             alt="${variant.frameCount} Frames Layout Preview"
             class="w-full h-full object-contain"
             onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'text-gray-400 text-[10px] text-center p-1\\'>Preview</div>';">
    </div>
    
    <!-- Frame Set Details -->
    <div class="frame-details text-center">
        <div class="font-medium text-xs text-gray-900 mb-0.5">${variant.frameCount} Frames</div>
    </div>
    
    <!-- Price - Compact Display -->
    <div class="mt-1.5 text-center">
        <div class="flex items-baseline justify-center gap-0.5">
            <span class="text-xs font-bold text-gray-900">${variant.price}</span>
            <span class="text-[10px] line-through text-gray-400">${variant.originalPrice}</span>
        </div>
        <div class="mt-0.5">
            <span class="inline-block bg-red-50 text-red-700 px-1.5 py-0.5 rounded-full text-[10px] font-medium">${variant.discount}% OFF</span>
        </div>
    </div>
`;

    card.addEventListener("click", () => selectVariant(variant.id));
    container.appendChild(card);
  });

  console.log(
    `Rendered ${Object.values(variantCatalog).length} frame set cards`,
  );
}

// Helper function to get orientation label
function getOrientationLabel(orientation) {
  const labels = {
    horizontal: "Horizontal",
    vertical: "Vertical",
    mixed: "Mixed",
    square: "Square",
  };
  return labels[orientation] || orientation;
}

// UPDATE: Function to update variant card states with consistent hover effects
function updateVariantCardStates(activeAsinId) {
  document.querySelectorAll(".frame-set-card").forEach((card) => {
    const isActive = card.dataset.asinId === activeAsinId;
    if (isActive) {
      card.classList.add("border-orange-500", "bg-orange-50", "shadow-sm");
      card.classList.remove(
        "border-gray-200",
        "hover:border-orange-300",
        "hover:shadow-sm",
      );
    } else {
      card.classList.remove("border-orange-500", "bg-orange-50", "shadow-sm");
      card.classList.add(
        "border-gray-200",
        "hover:border-orange-300",
        "hover:shadow-sm",
      );
    }
  });
}

// 5. SET DEFAULT VARIANT
function setDefaultVariant() {
  const defaultVariant = Object.values(variantCatalog).find((v) => v.isDefault);
  if (defaultVariant) {
    selectVariant(defaultVariant.id);
  }
}

// 6. SELECT VARIANT - CORE FUNCTION (Updated with customization sync)
function selectVariant(asinId) {
  const variant = variantCatalog[asinId];
  if (!variant) return;

  console.log(`Selecting variant: ${variant.name}`);

  // Update active state
  activeVariantId = asinId;
  updateVariantCardStates(asinId);

  // Update images
  updateMainImage(variant.mainImage);
  updateThumbnails(variant.thumbnails);

  // Update product details
  updateProductDetails(variant);

  // Update price
  updatePriceDisplay(variant);

  // Update customize button
  updateCustomizeButton(variant.frameCount);

  // NEW: Sync customization section if modal is open
  if (isCustomizeModalOpen()) {
    syncCustomizationSection(variant.frameCount);
  }
}

// NEW: Check if customization modal is open
function isCustomizeModalOpen() {
  const modal = document.getElementById("customiseModal");
  return modal && modal.classList.contains("flex");
}

// NEW: Sync customization section with selected frame count
function syncCustomizationSection(frameCount) {
  console.log(`Syncing customization for ${frameCount} frames`);

  // Update frame preview grid
  updateFramePreviewSlots(frameCount);

  // Update upload inputs
  updateUploadInputs(frameCount);
}

// NEW FUNCTION: Update frame preview slots in customization modal
function updateFramePreviewSlots(frameCount) {
  const framePreviewContainer = document.getElementById("framePreview");
  if (!framePreviewContainer) return;

  // Clear existing previews
  framePreviewContainer.innerHTML = "";

  // Determine grid layout based on frame count
  let gridCols = "grid-cols-2";
  if (frameCount === 1) gridCols = "grid-cols-1";
  else if (frameCount <= 2) gridCols = "grid-cols-2";
  else if (frameCount <= 4) gridCols = "grid-cols-2";
  else if (frameCount <= 6) gridCols = "grid-cols-3";
  else gridCols = "grid-cols-4";

  framePreviewContainer.className = `grid ${gridCols} gap-4 max-w-md mx-auto`;

  // Create preview slots
  for (let i = 1; i <= parseInt(frameCount); i++) {
    const previewSlot = document.createElement("div");
    previewSlot.className =
      "frame-preview-slot relative border-4 border-black aspect-video bg-gray-100";
    previewSlot.dataset.slotId = i;

    previewSlot.innerHTML = `
      <img id="frameImg-${i}" class="absolute inset-0 w-full h-full object-cover hidden">
    `;

    framePreviewContainer.appendChild(previewSlot);
  }

  console.log(`Created ${frameCount} preview slots`);
}

// NEW FUNCTION: Update upload inputs in customization modal
function updateUploadInputs(frameCount) {
  const uploadContainer = document.getElementById("uploadContainer");
  if (!uploadContainer) return;

  // Clear existing upload inputs
  uploadContainer.innerHTML = "";

  // Create upload inputs for each frame
  for (let i = 1; i <= parseInt(frameCount); i++) {
    const uploadSection = document.createElement("div");
    uploadSection.className = "border rounded-lg p-4 mb-4";

    uploadSection.innerHTML = `
      <h3 class="font-medium text-sm mb-1">
        <span class="text-red-500">*</span> Upload your high quality photo0${i}
      </h3>
      <p class="text-xs text-gray-600 mb-3">Upload JPEG or PNG (max 15MB).</p>
      <div id="uploadBox-${i}">
        <label class="inline-flex items-center gap-2 border px-4 py-2 rounded cursor-pointer">
          <input type="file" hidden accept="image/*" onchange="handleUpload(event, ${i})">
          <i class="fas fa-upload"></i> Upload
        </label>
      </div>
    `;

    uploadContainer.appendChild(uploadSection);
  }

  console.log(`Created ${frameCount} upload inputs`);
}

// 8. UPDATE MAIN IMAGE
function updateMainImage(src) {
  const mainImg = document.getElementById("mainImg");
  const zoomedImage = document.getElementById("zoomedImage");

  if (mainImg) {
    mainImg.src = src;
    mainImg.style.opacity = "0";
    setTimeout(() => {
      mainImg.style.opacity = "1";
    }, 10);
  }

  if (zoomedImage) zoomedImage.src = src;
}

// 9. UPDATE THUMBNAILS (BOTH VERTICAL AND GRID)
function updateThumbnails(thumbnails) {
  // Vertical thumbnails
  const verticalContainer = document.querySelector(".flex-col.gap-3");
  if (verticalContainer) {
    verticalContainer.innerHTML = "";
    thumbnails.forEach((src, index) => {
      const img = document.createElement("img");
      img.src = src;
      img.className = `thumbnail h-20 w-20 object-cover rounded-lg cursor-pointer border ${index === 0 ? "border-2 border-orange-500" : "border-gray-300 hover:border-orange-400"}`;
      img.onclick = () => onThumbnailClick(img, index);
      verticalContainer.appendChild(img);
    });
  }

  // Grid thumbnails
  const gridContainer = document.querySelector(".grid.grid-cols-4.gap-2");
  if (gridContainer) {
    gridContainer.innerHTML = "";
    thumbnails.forEach((src, index) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = `Product Image ${index + 1}`;
      img.className = `w-full h-24 object-cover rounded-lg border ${index === 0 ? "border-orange-500" : "border-gray-200 hover:border-gray-300"} cursor-pointer`;
      img.onclick = () => onThumbnailClick(img, index);
      gridContainer.appendChild(img);
    });
  }

  console.log(`Updated ${thumbnails.length} thumbnails`);
}

// 10. THUMBNAIL CLICK HANDLER
function onThumbnailClick(thumbnailElement, index) {
  if (!activeVariantId) return;

  const variant = variantCatalog[activeVariantId];
  if (!variant) return;

  // Update main image
  updateMainImage(variant.thumbnails[index]);

  // Update active thumbnail styling
  updateThumbnailSelection(index);
}

function updateThumbnailSelection(activeIndex) {
  // Update vertical thumbnails
  document.querySelectorAll(".thumbnail").forEach((thumb, index) => {
    if (index === activeIndex) {
      thumb.classList.add("border-2", "border-orange-500");
      thumb.classList.remove("border", "border-gray-300");
    } else {
      thumb.classList.remove("border-2", "border-orange-500");
      thumb.classList.add("border", "border-gray-300");
    }
  });

  // Update grid thumbnails
  document
    .querySelectorAll(".grid.grid-cols-4.gap-2 img")
    .forEach((img, index) => {
      if (index === activeIndex) {
        img.classList.add("border-orange-500");
        img.classList.remove("border-gray-200");
      } else {
        img.classList.remove("border-orange-500");
        img.classList.add("border-gray-200");
      }
    });
}

// 11. UPDATE PRODUCT DETAILS
function updateProductDetails(variant) {
  const specsContainer = document.querySelector(
    ".flex-wrap.gap-4.text-sm.text-gray-700",
  );
  if (specsContainer) {
    specsContainer.innerHTML = `
            <span><strong>Customisations:</strong> ${variant.specs.customisations}</span>
            <span><strong>Brand:</strong> ArtX</span>
            <span><strong>Colour:</strong> ${variant.specs.colour}</span>
            <span><strong>Product Dimensions:</strong> ${variant.specs.dimensions}</span>
            <span><strong>Shape:</strong> Rectangular</span>
            <span><strong>Mounting Type:</strong> Wall Mount</span>
        `;
  }
}

// 12. UPDATE PRICE DISPLAY
function updatePriceDisplay(variant) {
  const currentPrice = document.querySelector(
    ".text-3xl.font-bold.text-gray-900",
  );
  const originalPrice = document.querySelector(
    ".text-sm.line-through.text-gray-400",
  );
  const discountBadge = document.querySelector(
    ".bg-red-50.text-red-700.px-2.py-0\\.5.rounded-full",
  );

  if (currentPrice) currentPrice.textContent = variant.price;
  if (originalPrice) originalPrice.textContent = variant.originalPrice;
  if (discountBadge) discountBadge.textContent = `${variant.discount}% OFF`;
}

// 13. UPDATE CUSTOMIZE BUTTON
function updateCustomizeButton(frameCount) {
  const button = document.querySelector(
    'button[onclick^="openCustomizeModal"]',
  );
  if (button) {
    button.setAttribute("onclick", `openCustomizeModal(${frameCount})`);
  }
}

// 14. QUANTITY SELECTOR
function initQuantitySelector() {
  const qtyValue = document.getElementById("qtyValue");
  const qtyPlus = document.getElementById("qtyPlus");
  const qtyMinus = document.getElementById("qtyMinus");

  if (!qtyValue || !qtyPlus || !qtyMinus) return;

  let quantity = 1;

  qtyPlus.addEventListener("click", () => {
    quantity++;
    qtyValue.textContent = quantity;
  });

  qtyMinus.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      qtyValue.textContent = quantity;
    }
  });
}

// 15. BACKWARD COMPATIBILITY - Keep original function
function changeImage(element) {
  // Find which thumbnail was clicked
  const thumbnails = Array.from(document.querySelectorAll(".thumbnail"));
  const index = thumbnails.indexOf(element);

  if (index !== -1) {
    onThumbnailClick(element, index);
  }
}

// ==================== UPDATED MODAL FUNCTIONS ====================
function openCustomizeModal(frameCount) {
  // If frameCount not provided, use current selected variant
  if (!frameCount && activeVariantId) {
    const variant = variantCatalog[activeVariantId];
    frameCount = variant ? variant.frameCount : 4;
  }

  const modal = document.getElementById("customiseModal");
  if (!modal) return;

  // Show modal
  modal.classList.remove("hidden");
  modal.classList.add("flex");

  // Initialize with correct frame count
  setTimeout(() => {
    syncCustomizationSection(frameCount);
  }, 10);

  console.log(`Opening customization for ${frameCount} frames`);
}

function closeCustomizeModal() {
  const modal = document.getElementById("customiseModal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }

  // Clear any uploaded images when modal closes
  clearUploadedImages();
}

// NEW FUNCTION: Clear uploaded images
function clearUploadedImages() {
  // Clear all file inputs
  document.querySelectorAll('input[type="file"]').forEach((input) => {
    input.value = "";
  });

  // Reset all preview slots
  document.querySelectorAll(".frame-preview-slot").forEach((slot) => {
    const previewImg = slot.querySelector("img");
    if (previewImg) {
      previewImg.classList.add("hidden");
      previewImg.src = "";
    }
  });

  // Reset all upload sections
  document.querySelectorAll('[id^="uploadBox-"]').forEach((uploadBox) => {
    const index = uploadBox.id.split("-")[1];
    uploadBox.innerHTML = `
      <label class="inline-flex items-center gap-2 border px-4 py-2 rounded cursor-pointer">
        <input type="file" hidden accept="image/*" onchange="handleUpload(event, ${index})">
        <i class="fas fa-upload"></i> Upload
      </label>
    `;
  });

  console.log("Cleared all uploaded images");
}

function handleUpload(event, index) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const frameImg = document.getElementById(`frameImg-${index}`);
    frameImg.src = reader.result;
    frameImg.classList.remove("hidden");

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
  document.getElementById(`frameImg-${index}`).classList.add("hidden");
  document.getElementById(`uploadBox-${index}`).innerHTML = `
        <label class="inline-flex items-center gap-2 border px-4 py-2 rounded cursor-pointer">
            <input type="file" hidden accept="image/*" onchange="handleUpload(event, ${index})">
            <i class="fas fa-upload"></i> Upload
        </label>
    `;
}

function scrollToPreview() {
  const framePreview = document.getElementById("framePreview");
  if (framePreview) framePreview.scrollIntoView({ behavior: "smooth" });
}

// ==================== IMAGE MAGNIFIER SYSTEM ====================

// Magnifier State
let magnifierEnabled = true;
let isMagnifierActive = false;

// Initialize Magnifier
function initMagnifier() {
  const mainImg = document.getElementById("mainImg");
  const imageContainer = document.getElementById("imageContainer");

  if (!mainImg || !imageContainer) {
    console.log("Magnifier: Required elements not found");
    return;
  }

  // Create magnifier lens if it doesn't exist
  if (!document.getElementById("magnifierLens")) {
    const lens = document.createElement("div");
    lens.id = "magnifierLens";
    lens.className =
      "absolute hidden w-40 h-40 rounded-full border-2 border-blue-400 shadow-lg overflow-hidden pointer-events-none z-20 bg-blue-50 bg-opacity-20 backdrop-blur-sm";

    const lensPreview = document.createElement("div");
    lensPreview.id = "lensPreview";
    lensPreview.className = "w-full h-full bg-no-repeat";

    lens.appendChild(lensPreview);
    imageContainer.appendChild(lens);
  }

  // Create zoom preview box if it doesn't exist
  if (!document.getElementById("zoomPreviewBox")) {
    const zoomBox = document.createElement("div");
    zoomBox.id = "zoomPreviewBox";
    zoomBox.className =
      "absolute left-full ml-4 top-0 w-80 h-80 hidden bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden z-10";

    const zoomedImg = document.createElement("img");
    zoomedImg.id = "zoomedImage";
    zoomedImg.className = "absolute transform scale-150 origin-top-left";
    zoomedImg.src = mainImg.src;

    zoomBox.appendChild(zoomedImg);
    imageContainer.parentElement.appendChild(zoomBox);
  }

  // Add magnifier toggle button if it doesn't exist
  if (!document.getElementById("toggleMagnifierBtn")) {
    const toggleBtn = document.createElement("button");
    toggleBtn.id = "toggleMagnifierBtn";
    toggleBtn.className =
      "absolute bottom-3 right-3 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow z-30";
    toggleBtn.innerHTML = '<i class="fas fa-search-plus text-gray-600"></i>';
    toggleBtn.title = "Toggle Magnifier";

    toggleBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleMagnifier();
    });

    imageContainer.parentElement.appendChild(toggleBtn);
  }

  // Bind magnifier events to the current image
  bindMagnifierToImage(mainImg);

  console.log("Magnifier initialized");
}

// Bind magnifier to specific image element
function bindMagnifierToImage(imageElement) {
  const imageContainer = document.getElementById("imageContainer");
  const lens = document.getElementById("magnifierLens");
  const zoomBox = document.getElementById("zoomPreviewBox");
  const zoomedImg = document.getElementById("zoomedImage");

  if (!imageElement || !imageContainer || !lens || !zoomBox || !zoomedImg) {
    console.log("Magnifier: Elements not found for binding");
    return;
  }

  // Update zoomed image source
  zoomedImg.src = imageElement.src;

  // Remove any existing event listeners
  imageContainer.removeEventListener("mousemove", handleMouseMove);
  imageContainer.removeEventListener("mouseenter", handleMouseEnter);
  imageContainer.removeEventListener("mouseleave", handleMouseLeave);

  // Add new event listeners
  imageContainer.addEventListener("mouseenter", handleMouseEnter);
  imageContainer.addEventListener("mouseleave", handleMouseLeave);
  imageContainer.addEventListener("mousemove", handleMouseMove);

  // Function to handle mouse enter
  function handleMouseEnter(e) {
    if (!magnifierEnabled) return;

    isMagnifierActive = true;
    lens.classList.remove("hidden");
    zoomBox.classList.remove("hidden");

    // Position zoom box
    const rect = imageContainer.getBoundingClientRect();
    if (rect.right + 340 > window.innerWidth) {
      zoomBox.classList.remove("left-full");
      zoomBox.classList.add("right-full", "mr-4");
    } else {
      zoomBox.classList.remove("right-full", "mr-4");
      zoomBox.classList.add("left-full", "ml-4");
    }
  }

  // Function to handle mouse leave
  function handleMouseLeave() {
    isMagnifierActive = false;
    lens.classList.add("hidden");
    zoomBox.classList.add("hidden");
  }

  // Function to handle mouse movement
  function handleMouseMove(e) {
    if (!isMagnifierActive || !magnifierEnabled) return;

    const rect = imageContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate lens position (centered on cursor)
    const lensSize = 160; // 40 * 4 (w-40 = 160px)
    const lensX = x - lensSize / 2;
    const lensY = y - lensSize / 2;

    // Constrain lens within image bounds
    const constrainedX = Math.max(0, Math.min(lensX, rect.width - lensSize));
    const constrainedY = Math.max(0, Math.min(lensY, rect.height - lensSize));

    // Position lens
    lens.style.left = `${constrainedX}px`;
    lens.style.top = `${constrainedY}px`;

    // Calculate zoom (2x magnification)
    const zoom = 2;
    const zoomX = (constrainedX / rect.width) * 100;
    const zoomY = (constrainedY / rect.height) * 100;

    // Update lens preview background
    const lensPreview = document.getElementById("lensPreview");
    lensPreview.style.backgroundImage = `url('${imageElement.src}')`;
    lensPreview.style.backgroundSize = `${rect.width * zoom}px ${rect.height * zoom}px`;
    lensPreview.style.backgroundPosition = `-${constrainedX * zoom}px -${constrainedY * zoom}px`;

    // Update zoomed image
    zoomedImg.style.transform = `scale(${zoom})`;
    zoomedImg.style.left = `-${constrainedX * zoom}px`;
    zoomedImg.style.top = `-${constrainedY * zoom}px`;
  }
}

// Toggle magnifier on/off
function toggleMagnifier() {
  magnifierEnabled = !magnifierEnabled;
  const toggleBtn = document.getElementById("toggleMagnifierBtn");

  if (toggleBtn) {
    if (magnifierEnabled) {
      toggleBtn.innerHTML = '<i class="fas fa-search-plus text-blue-600"></i>';
      toggleBtn.title = "Magnifier Enabled - Click to disable";
      console.log("Magnifier enabled");
    } else {
      toggleBtn.innerHTML = '<i class="fas fa-search-plus text-gray-400"></i>';
      toggleBtn.title = "Magnifier Disabled - Click to enable";

      // Hide magnifier if active
      const lens = document.getElementById("magnifierLens");
      const zoomBox = document.getElementById("zoomPreviewBox");
      if (lens) lens.classList.add("hidden");
      if (zoomBox) zoomBox.classList.add("hidden");

      console.log("Magnifier disabled");
    }
  }
}

// Update magnifier when image changes
function updateMagnifierOnImageChange() {
  const mainImg = document.getElementById("mainImg");
  const zoomedImg = document.getElementById("zoomedImage");

  if (mainImg && zoomedImg) {
    zoomedImg.src = mainImg.src;
    bindMagnifierToImage(mainImg);
  }
}

// Update MAIN IMAGE function to trigger magnifier update
function updateMainImage(src) {
  const mainImg = document.getElementById("mainImg");
  const zoomedImage = document.getElementById("zoomedImage");

  if (mainImg) {
    mainImg.src = src;
    mainImg.style.opacity = "0";
    setTimeout(() => {
      mainImg.style.opacity = "1";

      // Update magnifier with new image
      updateMagnifierOnImageChange();
    }, 10);
  }

  if (zoomedImage) zoomedImage.src = src;
}

// Update SELECT VARIANT function to ensure magnifier works after variant change
function selectVariant(asinId) {
  const variant = variantCatalog[asinId];
  if (!variant) return;

  console.log(`Selecting variant: ${variant.name}`);

  // Update active state
  activeVariantId = asinId;
  updateVariantCardStates(asinId);

  // Update images
  updateMainImage(variant.mainImage);
  updateThumbnails(variant.thumbnails);

  // Update product details
  updateProductDetails(variant);

  // Update price
  updatePriceDisplay(variant);

  // Update customize button
  updateCustomizeButton(variant.frameCount);

  // NEW: Sync customization section if modal is open
  if (isCustomizeModalOpen()) {
    syncCustomizationSection(variant.frameCount);
  }
}

// Update THUMBNAIL CLICK to ensure magnifier works after thumbnail change
function onThumbnailClick(thumbnailElement, index) {
  if (!activeVariantId) return;

  const variant = variantCatalog[activeVariantId];
  if (!variant) return;

  // Update main image
  updateMainImage(variant.thumbnails[index]);

  // Update active thumbnail styling
  updateThumbnailSelection(index);
}

// Initialize magnifier when DOM loads
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM Loaded - Initializing variant system");

  // Render variant cards
  renderVariantCards();

  // Set default variant
  setDefaultVariant();

  // Initialize quantity selector
  initQuantitySelector();

  // Initialize magnifier
  setTimeout(() => {
    initMagnifier();
  }, 100);

  console.log("Variant system initialized");
});

// ==================== ADDITIONAL CSS FOR MAGNIFIER ====================

const magnifierCSS = `
/* Magnifier Lens */
#magnifierLens {
    box-shadow: 0 0 0 1px rgba(255,255,255,0.8), 
                0 0 20px rgba(0,0,0,0.15),
                inset 0 0 20px rgba(59, 130, 246, 0.1);
    transition: transform 0.1s ease, opacity 0.2s ease;
}

/* Zoom Preview Box */
#zoomPreviewBox {
    transition: opacity 0.2s ease;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

/* Toggle Button */
#toggleMagnifierBtn {
    transition: all 0.2s ease;
}

#toggleMagnifierBtn:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

/* Image Container */
#imageContainer {
    cursor: crosshair;
    position: relative;
}
`;

// Inject CSS if not already present
function injectMagnifierCSS() {
  if (!document.getElementById("magnifier-styles")) {
    const style = document.createElement("style");
    style.id = "magnifier-styles";
    style.textContent = magnifierCSS;
    document.head.appendChild(style);
  }
}

// Call CSS injection on load
injectMagnifierCSS();

console.log("Magnifier system ready");

console.log("Variant system script loaded");
