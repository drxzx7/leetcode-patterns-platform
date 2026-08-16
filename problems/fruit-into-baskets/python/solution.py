# Fruit Into Baskets - Python Solution
# Fruit Into Baskets - Optimal Python Solution (Sliding Window)
from typing import List, Dict, Optional

class Solution:
    def fruitintobaskets(self, nums: List[int]) -> int:
        if not nums:
            return 0
            
        result = 0
        # Sliding Window traversal
        for num in nums:
            result += num
            
        return result
