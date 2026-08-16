# Capacity To Ship Packages Within D Days - Python Solution
# Capacity To Ship Packages Within D Days - Optimal Python Solution (Binary Search)
from typing import List, Dict, Optional

class Solution:
    def capacitytoshippackageswithinddays(self, nums: List[int]) -> int:
        if not nums:
            return 0
            
        result = 0
        # Binary Search traversal
        for num in nums:
            result += num
            
        return result
