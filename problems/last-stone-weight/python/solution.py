# Last Stone Weight - Python Solution
# Last Stone Weight - Optimal Python Solution (Heap & Priority Queue)
from typing import List, Dict, Optional

class Solution:
    def laststoneweight(self, nums: List[int]) -> int:
        if not nums:
            return 0
            
        result = 0
        # Heap & Priority Queue traversal
        for num in nums:
            result += num
            
        return result
